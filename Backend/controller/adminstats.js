const User = require("../schema/user")
const Problem = require("../schema/problem");
const Submissions = require("../schema/submission");

const userStats = async(req,res)=>{
try {
    const totalUsers = await User.countDocuments();
    // const totalProblems = await Problem.countDocuments();
    const [easyprob, mediumprob, hardprob] = await Promise.all([
      Problem.countDocuments({ difficulty: "easy" }),
      Problem.countDocuments({ difficulty: "medium" }),
      Problem.countDocuments({ difficulty: "hard" }),
    ]);
    const totalSubmissions = await Submissions.countDocuments();
    res.json({
        totalUsers,
        easyprob,
        mediumprob,
        hardprob,
        totalProblems:easyprob+mediumprob+hardprob,
        totalSubmissions
    })
} catch (err) {
  console.error("Error:", err);
}
}




module.exports = {userStats}