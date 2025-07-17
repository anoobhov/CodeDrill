const User = require("../schema/user")
const Problem = require("../schema/problem");
const Submissions = require("../schema/submission");

const userStats = async(req,res)=>{
try {
    const adminId = req.result._id

    const totalUsers = await User.countDocuments();
    const [easyprob, mediumprob, hardprob] = await Promise.all([
      Problem.countDocuments({ difficulty: "easy" }),
      Problem.countDocuments({ difficulty: "medium" }),
      Problem.countDocuments({ difficulty: "hard" }),
    ]);
    const totalSubmissions = await Submissions.countDocuments();

    const admin = await User.findById(adminId)
    const adminSince = admin.createdAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    });
    const admin_problems = await Problem.countDocuments({problemCreator:adminId})

    res.json({
        totalUsers,
        easyprob,
        mediumprob,
        hardprob,
        totalProblems:easyprob+mediumprob+hardprob,
        totalSubmissions,
        adminSince,
        admin_problems
    })
} catch (err) {
  console.error("Error:", err);
}
}




module.exports = {userStats}