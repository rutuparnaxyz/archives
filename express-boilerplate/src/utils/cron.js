const CronJob = require('cron').CronJob;
const Otp = require('../db/sequelize').otp;

const job = new CronJob('* * */12 * * *', async function() {
	await Otp.destroy({
        where: {
            isVerified: false
        }
    })
	console.log('Destroyed successfully');
});

module.exports = job;