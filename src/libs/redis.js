import Redis from 'redis'
const client = Redis.createClient({
    host: '127.0.0.1',
    port: 6379
})

client.connect()

client.on('ready', () => {
console.log('Redis is connected!');
})


export default client