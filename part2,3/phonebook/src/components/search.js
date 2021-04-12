const Search=(props)=>
{
    return(
        <form>
          filter shown with <input value={props.showFilter} onChange={props.handleFilterChange}/><br/>
        </form>
    )
}
export default Search;