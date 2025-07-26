const User = require("../schema/user")
const Problem = require("../schema/problem");
const Submissions = require("../schema/submission");

const adminStats = async(req,res)=>{
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

const userStats = async (req,res) => {
  try {
    const userId = req.result._id

    // Counting the user
    const user = await User.findById(userId).populate("problemSolved").lean()
    const counts = {
    easy: 0,
    medium: 0,
    hard: 0
  };

   user.problemSolved.forEach(problem=>{
    const diff = problem.difficulty?.toLowerCase();
    // console.log(diff)
    counts[diff]++
  })


  // User since 
  const userSince = user.createdAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    });

    user.createdAt = userSince
    user.counts = counts
    const [easyprob, mediumprob, hardprob] = await Promise.all([
      Problem.countDocuments({ difficulty: "easy" }),
      Problem.countDocuments({ difficulty: "medium" }),
      Problem.countDocuments({ difficulty: "hard" }),
    ]);
    const totalprobs = {
      easyprob,
      mediumprob,
      hardprob
    }

    const userTotalSubmissions = await Submissions.find({userId:user._id}).populate("problemId","title")

    const dailyCounts = {};
userTotalSubmissions.forEach(sub => {
  const date = sub.createdAt.toISOString().slice(0, 10);
  dailyCounts[date] = (dailyCounts[date] || 0) + 1;
});

    res.json({user,totalprobs,userTotalSubmissions,dailyCounts})


  } catch (error) {
    
  }
}


module.exports = {adminStats,userStats}