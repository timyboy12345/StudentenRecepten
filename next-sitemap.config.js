/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://studentenrecepten.com',
    generateRobotsTxt: true,
    output: 'export',
}
