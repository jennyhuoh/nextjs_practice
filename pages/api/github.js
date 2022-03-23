// const { Octokit } = require("@octokit/rest");

// export default async (res, req) => {
//     const octokit = new Octokit({
//         auth:'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',
//         baseUrl: 'https://api.github.com',
//     })
//     const repos = await octokit.request(`/users/jennyhuoh/repos`)
//     const reposLength = repos.data.length
   
//     return res.status(200).json({repos: reposLength})
// }