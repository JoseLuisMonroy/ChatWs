import { createBot, MemoryDB, createProvider } from '@builderbot/bot'
import { BaileysProvider } from '@builderbot/provider-baileys'
import flow from './flows';

const PORT = process.env.PORT ?? 3001

const main = async () => {
    const provider = createProvider(BaileysProvider)

    const { handleCtx, httpServer } = await createBot({
        database: new MemoryDB(),
        provider,
        flow,
    })

    httpServer(+PORT)

    provider.server.post('/v1/messages', handleCtx(async (bot, req, res) => {
        try {
            const { phones, message } = req.body
            if (!phones || !message) {
                return res.end('missing phones or message')
            }
            for (const number of phones) {
                await bot.sendMessage(number, message,{})
            }
            return res.end('send')
        } catch (error) {
            console.error(error)
            return res.end('error')
        }
    }))
}

main()
