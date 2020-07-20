const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    const users = ['Henk', 'Jan', 'Pietje', 'Puk']

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write(
            `<html>
                <head>
                    <title>Welcome!</title>
                </head>
                <body>
                    <h1>Welcome!</h1>
                    <form action="/users" method="POST">
                        <input type="text" placeholder="enter username">
                        <button type="submit">Create user</button>
                        </input>
                    </form>
                </body>
            </html>`
        )
        return res.end()
    } 
    
    if (url === '/users' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302
                res.setHeader('Location', '/')
            })
            users.push(message)
            return res.end()
        })
    }

    res.setHeader('Content-Type', 'text/html')
    res.write(
        `<html>
            <head>
                <title>Welcome users!</title>
            </head>
            <body>
                <h1>Welcome users!</h1>
                <ul>
                    ${users.map((obj) => {
                        return `<li>${obj}</li>`
                    }).join('')}
                </ul>
            </body>
        </html>`
    )
    res.end()
}

module.exports = requestHandler