function Filter(){
    let filterproblems = problems.filter((problem)=>{
        const  difficultyMatch = filters.difficulty === 'all' || problem.difficulty ===filters.difficulty
        const  tagMatch = filters.tag === 'all' || problem.tags ===filters.tag
        const  statusMatch = filters.status === 'all' ||(filters.status === 'solved'&& solvedproblems.some(sp=>sp._id === problem._id))|| 
                (filters.status === 'unsolved' && !solvedproblems.some(sp => sp._id === problem._id))||
                (filters.status === 'liked'&& likedproblems.some(sp=>sp._id === problem._id));
        return difficultyMatch&&tagMatch&&statusMatch
    })

    if (filters.likes === 'desc') {
    filterproblems.sort((a, b) => b.likes - a.likes);
} else if (filters.likes === 'asc') {
    filterproblems.sort((a, b) => a.likes - b.likes);
}
    const handleThumbsClick = () => {
  if (filters.likes === 'none') {
    setFilters({...filters,likes:'desc'})
  } else if (filters.likes === 'desc') {
    setFilters({...filters,likes:'asc'})
  } else {
    setFilters({...filters,likes:'none'})
  }
};
    const likedIds = likedproblems.map(p => p._id.toString())
}