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


const allDates = Object.keys(dailyCounts);
    if (allDates.length === 0) return 0;

    // Step 1: Sort the dates
    const sortedDates = allDates.sort();
    const startDate = new Date(sortedDates[0]);
    const endDate = new Date(sortedDates[sortedDates.length - 1]);

    // Step 2: Fill all days between min and max
    const dateMap = {};
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split("T")[0];
        dateMap[dateStr] = dailyCounts[dateStr] || 0;
    }

    // Step 3: Traverse from the end and count consecutive non-zero days
    // const dateEntries = Object.entries(dateMap);
    let currentStreak = 0;
    let longestStreak = 0;

    for (const date of Object.keys(dateMap)) {
        if (dateMap[date] > 0) {
            currentStreak++;
            longestStreak = Math.max(longestStreak, currentStreak);
        } else {
            currentStreak = 0;
        }
    }
      const streaks = {
        currentStreak,
        longestStreak
      }

    res.json({user,totalprobs,userTotalSubmissions,dailyCounts,streaks})
      
  } catch (error) {
    
  }
}


module.exports = {adminStats,userStats}