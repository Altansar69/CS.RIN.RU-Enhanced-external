local json = require("json")
local logger = require("logger")
local millennium = require("millennium")
local fs = require("fs")

local M = {}

M.DEFAULTS = {
    defaultTag = "Cracked",  -- shown when the topic has no tag; empty to disable
    showSteamDB = true,
    showPCGW = true,
}

-- %APPDATA%\CsRinRuEnhanced\settings.json. Versions up to 2.0 wrote a generic
-- settings.json at the root of Millennium's folder: it is read once as a fallback.
local function get_dir()
    local appdata = os.getenv("APPDATA")
    if appdata and appdata ~= "" then return appdata .. "\\CsRinRuEnhanced" end
    return millennium.get_install_path() .. "\\CsRinRuEnhanced"
end

local function get_path()
    return get_dir() .. "\\settings.json"
end

local function legacy_path()
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

local function read_json(path)
    local file = io.open(path, "r")
    if not file then return nil end
    local content = file:read("*a")
    file:close()
    local ok, parsed = pcall(json.decode, content)
    if ok and type(parsed) == "table" then return parsed end
    return nil
end

function M.load()
    local parsed = read_json(get_path())
    if parsed == nil then
        -- only take the old file if it really is ours
        local legacy = read_json(legacy_path())
        if legacy and legacy.defaultTag ~= nil then parsed = legacy end
    end
    return M.merge_defaults(parsed or {})
end

function M.save(settings)
    pcall(fs.create_directories, get_dir())
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
