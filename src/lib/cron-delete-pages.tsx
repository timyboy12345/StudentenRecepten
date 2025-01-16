const endpoint = "https://api.cloudflare.com/client/v4/accounts/1c5acf0cccc4661a99218dd6dbe57d08/pages/projects/studentenrecepten/deployments";
const expirationDays = 7;
const REPLACE_WITH_API_TOKEN = 'REPLACE HERE';

// @ts-ignore
module.exports = async function (data) {
    const init = {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": `Bearer ${REPLACE_WITH_API_TOKEN}`,
        },
    };

    const response = await fetch(endpoint, init);
    const deployments = await response.json();

    const deleted = [];

    for (const deployment of deployments.result) {
        // Check if the deployment was created within the last x days (as defined by `expirationDays` above)
        // @ts-ignore
        if ((Date.now() - new Date(deployment.created_on)) / 86400000 > expirationDays) {
            deleted.push(deployment);

            // Delete the deployment
            await fetch(`${endpoint}/${deployment.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Authorization": `Bearer ${REPLACE_WITH_API_TOKEN}`,
                },
            });
        }
    }

    return {deleted};
}
