import { URLModel } from 'database/model/URL'
import { Request, response, Response } from "express"
import shortId from 'shortid'
import { config } from '../config/Constants'

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void>{
        //ver se a url já não existe
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })
        if (url) {
            response.json(url)
            return
        }

        // criar o hash para essa URL
        const hash = shortId.generate();
        const shortURL = `${config.API_URL}/${hash}}`
        const newURL = await URLModel.create({ hash, shortURL, originURL })
        response.json(newURL)
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        const { hash } = req.params
        const url = await URLModel.findOne({ hash })

        if (url) {
            response.redirect(url.originURL)
            return
        }

        response.status(400).json({ error: 'URL not found' })
    }
}