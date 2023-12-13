const React = require('react')
const Default = require('./layouts/Default')

function New ({bakers}) {
    return (
      <Default>
        <h2>Add a new bread</h2>
        <form action='/breads' method='POST'>
            <label htmlFor="name"></label>
            <input 
             type="text"
             name='name'
             id='name'
             required 
            />
            <label htmlFor="image"></label>
            <input 
             type="text"
             name='image'
             id='image' 
            />
            <label htmlFor="hasGluten"></label>
            <input 
             type="checkbox"
             name='hasGluten'
             id='hasGluten' 
            />
            <label htmlFor="baker">Baker</label>
            <select name="baker" id="baker">
              {bakers.map((baker) => {
                return(
                    <option value={baker.id} key={baker.id}>{baker.name}</option>
                  )
              })}
            </select>

            <br />
            <input type="submit"/>
        </form>
        <div className='backButton'>
            <a href="/breads"><button>Go back to the index</button></a>
        </div>
      </Default>
    )
}

module.exports = New
