const loadData=async (search_name)=>{
const res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_name}`)
const meal_data= await res.json();
displayData(meal_data);
};

document.getElementById('search-btn').addEventListener('click',(event)=>{
    const search_name=document.getElementById('search-box').value;
    loadData(search_name);
});

const displayData=(meal_data)=>{
    const allData=meal_data.meals;
    const card_container= document.getElementById('card-container');
    card_container.innerHTML=" ";
    if (!allData) {
        card_container.innerHTML = "<p>No meals found.</p>";
        return;
    }
    allData.forEach((data)=>{
        const div=document.createElement('div');
        div.classList.add('card','m-2');
        div.style.width = "18rem";
        div.innerHTML=`
        <div>
        <img src="${data.strMealThumb}" class="card-img-top" alt="${data.strMeal}">
            <div class="card-body">
                    <h5 class="card-title">${data.strMeal}</h5>
                    <p class="card-text">${data.strInstructions.substring(0, 100)}...</p>
                    <a href="${data.strYoutube}" class="btn btn-primary">Go somewhere</a>
                </div>
        </div>
        `;
        card_container.appendChild(div);
    })
};