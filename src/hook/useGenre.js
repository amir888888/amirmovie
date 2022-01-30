const useGenre = (g) => {
    if(g.length < 1) return "";

    const genreIds = g.map((genre) => genre.id);
    return genreIds.reduce((acc, curr) => acc+","+curr);

};
export default useGenre;