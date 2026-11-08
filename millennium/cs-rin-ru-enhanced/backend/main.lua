--[[
    CS.RIN.RU Enhanced - Millennium backend

    The store page cannot fetch cs.rin.ru itself (CORS), so the webkit script
    asks the backend to do the HTTP request and parses the HTML on its side.

    cs.rin.ru answers the first request with a JS "Security check" page that
    sets a securitytoken cookie and redirects to /securitycheck/<path>. We
    replay that handshake here and keep the token until it expires.
]]

local http = require("http")
local json = require("json")
local logger = require("logger")
local millennium = require("millennium")
local settings = require("settings")

local BASE = "https://cs.rin.ru"
local USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
local TIMEOUT = 20

local security = { token = nil, expiration = 0 }

local function request(url)
    local headers = { ["User-Agent"] = USER_AGENT }
    if security.token and os.time() < security.expiration then
        headers["Cookie"] = "securitytoken=" .. security.token .. "; securitytoken_expiration=" .. security.expiration
    end
    return http.get(url, { headers = headers, timeout = TIMEOUT })
end

local function is_security_check(body)
    return type(body) == "string" and body:find("securitytoken=", 1, true) ~= nil
end

-- Extract the token from the challenge page and validate it on /securitycheck
local function pass_security_check(url, body)
    local token = body:match("securitytoken=([^;\"]+)")
    local expiration = tonumber(body:match("securitytoken_expiration=(%d+)"))
    if not token or not expiration then return false end

    security.token, security.expiration = token, expiration
    local path = url:sub(#BASE + 1)
    local response = request(BASE .. "/securitycheck" .. path)
    logger:info("Security check answered with HTTP " .. tostring(response and response.status))
    return response ~= nil
end

function FetchRin(url)
    local ok, result = pcall(function()
        if type(url) ~= "string" or url:sub(1, #BASE + 1) ~= BASE .. "/" then
            return json.encode({ success = false, error = "URL not allowed" })
        end

        local response, err = request(url)
        if response and is_security_check(response.body) and pass_security_check(url, response.body) then
            response, err = request(url)
        end
        if not response then
            return json.encode({ success = false, error = err or "request failed" })
        end
        if is_security_check(response.body) then
            return json.encode({ success = false, error = "security check not passed" })
        end

        return json.encode({ success = true, status = response.status, body = response.body })
    end)

    if not ok then
        logger:error("FetchRin error: " .. tostring(result))
        return json.encode({ success = false, error = tostring(result) })
    end
    return result
end

local function on_load()
    logger:info("CS.RIN.RU Enhanced loaded, Millennium " .. millennium.version())
    millennium.ready()
end

local function on_unload()
    logger:info("CS.RIN.RU Enhanced unloaded")
end

function GetSettings()
    local ok, result = pcall(function()
        return json.encode({ success = true, data = settings.load() })
    end)
    if not ok then return json.encode({ success = false, error = tostring(result) }) end
    return result
end

function SaveSettings(settings_json)
    local ok, result = pcall(function()
        local parsed = json.decode(settings_json)
        if type(parsed) ~= "table" then
            return json.encode({ success = false, error = "Invalid settings" })
        end
        return json.encode({ success = settings.save(settings.merge_defaults(parsed)) })
    end)
    if not ok then return json.encode({ success = false, error = tostring(result) }) end
    return result
end

return {
    on_load = on_load,
    on_unload = on_unload,
    FetchRin = FetchRin,
    GetSettings = GetSettings,
    SaveSettings = SaveSettings,
}


