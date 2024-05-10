local key = KEYS[1]
local count = tonumber(ARGV[1])
local time = tonumber(ARGV[2])
local limit = tonumber(redis.call('get', key) or "0")

if limit > count then
    return 0
else
    redis.call('incr', key)
    redis.call('expire', key, time)
    return 1
end

