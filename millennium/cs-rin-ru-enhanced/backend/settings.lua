local json = require("json")
local logger = require("logger")
local millennium = require("millennium")

local M = {}

M.DEFAULTS = {
    defaultTag = "Cracked",  -- shown when the topic has no tag; empty to disable
    showSteamDB = true,
    showPCGW = true,
}

local function get_path()
    return millennium.get_install_path() .. "/settings.json"
end

function M.merge_defaults(settings)
    local result = {}
    for k, v in pairs(M.DEFAULTS) do
        if settings[k] ~= nil and type(settings[k]) == type(v) then
            result[k] = settings[k]
        else
            result[k] = v
        end
    end
    return result
end

function M.load()
    local file = io.open(get_path(), "r")
    if not file then return M.merge_defaults({}) end
    local content = file:read("*a")
    file:close()

    local ok, parsed = pcall(json.decode, content)
    if not ok or type(parsed) ~= "table" then
        return M.merge_defaults({})
    end
    return M.merge_defaults(parsed)
end

function M.save(settings)
    local file, err = io.open(get_path(), "w")
    if not file then
        logger:error("Failed to write settings: " .. (err or "unknown"))
        return false
    end
    file:write(json.encode(settings))
    file:close()
    return true
end

return M


