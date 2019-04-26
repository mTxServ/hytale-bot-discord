// Invite Link -> https://discordapp.com/api/oauth2/authorize?client_id=YOUR_SERVER_ID&permissions=3072&scope=bot

const Discord = require('discord.js');
const client = new Discord.Client();
const HytaleApi = require('hytale-api-sdk');

const api = new HytaleApi.ArticlesApi();

// bot connected to discord
client.once('ready', () => {
    console.log('Ready!');
});

// catch errors
client.on("error", (e) => console.log(e));

client.on('message', message => {
    if (message.content === 'h!news') {
        console.log('h!news');

        api.getArticles({}, function(error, data, response) {
            if (error) {
                console.error(error);
            } else {
                // get 3 latest articles
                const latest = data.slice(0, 3);
                latest.forEach(function (article) {
                    const publishAt = new Date(article.publishedAt);
                    const embed = new Discord.RichEmbed()
                        .setColor(3447003)
                        .setThumbnail(`https://hytale.com/m/variants/blog_thumb_${article.coverImage.s3Key}`)
                        .setAuthor('HytaleBot', 'https://hytale.com/favicon.ico')
                        .setTitle(article.title)
                        .setDescription(article.bodyExcerpt)
                        .setURL(`https://hytale.com/news/${publishAt.getFullYear()}/${publishAt.getMonth() + 1}/${article.slug}`)
                        .addField('Published At', `${publishAt.toLocaleDateString()}`)
                    ;

                    message.channel.send({embed});
                });
            }
        });
    }
});

// start bot
client.login('YOUR_TOKEN_HERE0');
