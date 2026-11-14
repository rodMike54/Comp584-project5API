// Project 5 API
// Michael Rodriguez
// Link to the Chuck Norris API
const apiURL = "https://api.chucknorris.io/jokes/random";

// Get the elements from HTML
const jokeText = document.getElementById("jokeText");
const jokeCard = document.getElementById("jokeCard");
const jokeButton = document.getElementById("jokeButton");
const animationButton = document.getElementById("animationButton");
const category = document.getElementById("category");
const statusText = document.getElementById("status");

// Function to play the animation
const playAnimation = () => 
{

    // Remove the old animation
    jokeCard.classList.remove("animate");

    // Reset the animation
    void jokeCard.offsetWidth;

    // Play the animation again
    jokeCard.classList.add("animate");
};

// Function to get a random joke
const getJoke = () => 
{

    // Get the category the user picked
    const selectedCategory = category.value;

    let url = apiURL;

    // Add the category to the API link
    if (selectedCategory !== "") 
    {
        url = `${apiURL}?category=${selectedCategory}`;
    }

    // Show loading message
    jokeButton.disabled = true;
    statusText.textContent = "Loading joke...";

    // Request a joke from the API
    fetch(url)
        .then((response) => 
        {

            // Check if the API worked
            if (!response.ok) {
                throw new Error("Unable to get joke");
            }

            // Change the response into JSON
            return response.json();
        })
        
        .then((data) => 
        {

            // Put the joke on the webpage
            jokeText.textContent = data.value;

            // Play the card animation
            playAnimation();

            statusText.textContent = "";
        })
        
        .catch((error) => 
        {

            // Show a message if the API fails
            jokeText.textContent =
                "Sorry, could not load a joke. Try again.";

            statusText.textContent = "API request failed.";
            console.error(error);
        })
        
        .finally(() => 
        {

            // Turn the button back on
            jokeButton.disabled = false;
        });
};

// Button to get another joke
jokeButton.addEventListener("click", getJoke);

// Button to replay the animation
animationButton.addEventListener("click", playAnimation);

// Get a joke when the page loads
getJoke();
