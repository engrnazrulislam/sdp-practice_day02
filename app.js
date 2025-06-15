const loadData=async (search_name)=>{
const res=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_name}`)
const meal_data= await res.json();
displayData(meal_data);
};

const getDetails=async (search_id)=>{
    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${search_id}`)
    const details_data=await res.json();
    displayDetails(details_data);
}

document.getElementById('search-btn').addEventListener('click',(event)=>{
    const search_name=document.getElementById('search-box').value;
    loadData(search_name);
    const card_details=document.getElementById('card-details');
    card_details.className=" ";
    card_details.innerHTML=" ";
});

const displayData=(meal_data)=>{
    const allData=meal_data.meals;
    const card_container= document.getElementById('card-container');
    card_container.innerHTML=" ";
    if (!allData) {
        card_container.innerHTML = `
        <div class="m-2 text-center m-auto">
        <p class="fw-bold"> Data is not founded </p>
        </div>
        `;
        return;
    }
    allData.forEach((data)=>{
        const div=document.createElement('div');
        div.classList.add('card','m-2','text-center','shadow','rounded');
        div.style.width = "18rem";
        div.innerHTML=`
        <div>
        <img src="${data.strMealThumb}" class="card-img-top" alt="${data.strMeal}">
            <div class="card-body text-danger">
                <h5 class="card-title">${data.strMeal}</h5>
            </div>
        </div>
        `;
        card_container.appendChild(div);
        div.addEventListener('click',(event)=>{
            getMealID(`${data.idMeal}`);
            card_container.innerHTML=" ";
        })
    })
};
const getMealID=(idMeal)=>{
    getDetails(idMeal);
};
const displayDetails=(details_data)=>{
    const individual_data=details_data.meals[0];
    const card_details = document.getElementById('card-details');
    card_details.classList.add('card', 'm-2', 'shadow', 'rounded', 'p-2');
    card_details.style.width="30rem";
    let ingredient_list='';
    for(let i=0; i<=20; i++){
        const ingredients=individual_data[`strIngredient${i}`];
        if(ingredients && ingredients.trim() !==''){
            ingredient_list+=`<li>${ingredients}</li>`;
        }
    }
    card_details.innerHTML=`
        <img src="${individual_data.strMealThumb}" class="card-img-top" alt="${individual_data.strMeal}">
        <h2>${individual_data.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul>
            ${ingredient_list}
        </ul>
    `;
}