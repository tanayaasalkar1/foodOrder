
const API_URL = "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";

// Store menu items
let foodItems = [];


async function getMenu() {
    try {
        const response = await fetch(
            "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch menu");
        }

        const foodItems = await response.json();

        const menu = document.getElementById("landing-menu");
        menu.innerHTML = "";

        const images = {
            1: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
            2: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
            3: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500",
            4: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
            5: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500",
            6: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500",
            7: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500",
            8: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
            9: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
            10: "https://images.unsplash.com/photo-1579208030886-b937da0925dc?w=500",
            11: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
            12: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500",
            13: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
            14: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500",
            15: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500",
            16: "https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=500",
            17: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500",
            18: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=500",
            19: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
            20: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500",
            21: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500",
            22: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500",
            23: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=500",
            24: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb6?w=500",
            25: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500"
        };

        foodItems.forEach(item => {
            const card = document.createElement("div");

            card.classList.add("food-card");

            const imageURL = images[item.id] || 
                "https://placehold.co/500x300?text=Food";

            card.innerHTML = `
                <img 
                    src="${imageURL}" 
                    alt="${item.name}"
                    onerror="this.onerror=null; this.src='https://placehold.co/500x300?text=Food';"
                >

                <div class="food-details">
                    <div class="food-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price}/-</p>
                    </div>

                    <button class="add-btn" data-id="${item.id}">
                        +
                    </button>
                </div>
            `;

            menu.appendChild(card);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}




// 2. TAKE ORDER
function TakeOrder() {

    return new Promise((resolve) => {

        setTimeout(() => {

            // Select three random burgers
            const burgers = foodItems.filter(item =>
                item.name.toLowerCase().includes("burger")
            );

            const selectedBurgers = [];

            for (let i = 0; i < 3; i++) {

                const randomIndex = Math.floor(
                    Math.random() * burgers.length
                );

                selectedBurgers.push(burgers[randomIndex]);
            }

            const order = {
                items: selectedBurgers
            };

            console.log("Order placed:", order);

            resolve(order);

        }, 2500);

    });
}


// 3. ORDER PREPARATION
function orderPrep() {

    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("Order is being prepared");

            resolve({
                order_status: true,
                paid: false
            });

        }, 1500);

    });
}


// 4. PAY ORDER
function payOrder() {

    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("Payment successful");

            resolve({
                order_status: true,
                paid: true
            });

        }, 1000);

    });
}


// 5. THANK YOU FUNCTION
function thankyouFnc() {

    alert("Thank you for eating with us today!");

}


// 6. PROMISE CHAINING
function startOrderProcess() {

    TakeOrder()

        .then((order) => {

            console.log("Order received:", order);

            return orderPrep();

        })

        .then((prepResult) => {

            console.log("Preparation result:", prepResult);

            return payOrder();

        })

        .then((paymentResult) => {

            console.log("Payment result:", paymentResult);

            if (paymentResult.paid === true) {
                thankyouFnc();
            }

        })

        .catch((error) => {

            console.error("Something went wrong:", error);

        });

}


// INITIALIZE WEBSITE
getMenu()
    .then(() => {
        console.log("Menu loaded successfully");

        // Start ordering after menu is loaded
        startOrderProcess();
    })
    .catch((error) => {
        console.error("Unable to initialize restaurant:", error);
    });
