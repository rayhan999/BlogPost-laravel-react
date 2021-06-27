# BlogPost-laravel-react
A crud operation web application where users can Create, Retrieve, Update, Delete Posts. Backend in Laravel framework and Frontend in React JS framework.

<!-- ## Thumbnail
   <img src="" /> -->
   


## Features

    1. As a user I can see all the “Posts”
        a. At first, it'll load last 10 posts(DESC order) as the page loads.
        b. Add a “load more” button, which if clicked, it'll load 10 more posts.
    2. As a user I have to login with username/email and password. And if I'm a new user, then I have to signup first.
    3. As a user, I can -
        a. See my own posts
        b. Can update the posts
        c. Can delete the posts
    4. As a user I can add a new post with “Post title” and “Description”
    5. As a user I can see post details with respective comments along with the post on a separate page
    6. As a user, I can add comment on a post ( user must be logged in to add comment)
    7. As a user I can see all the other users listed in a table. (No plugin Used.)
        a. It'll show the columns - “Name”, “Email”, “Website”
        b. It has option to sort columns with name, email. (ASC, DSC)
        c. It has option to search users from table name, email, website
        d. It has pagination page size (Number of users displaying per page. Eg: 3, 5, All) & it can be changeable
        e. If user reload the page then it'll show the list according to the state (filter/sort/pagination/page size) before the    reload
        f. Clicking on a user’s name will take me to the corresponding user profile page where the details for that user will be shown as well as his/her all posts with pagination.

  

### Installation

    1. Clone the project using git clone   
    2. Copy the `.env.example` file & rename to `.env` .    
    3. Update .env file by adding database information.  
    4. Go to project root folder & Open git bash or terminal & run  `composer install`.       
    5. Run `php artisan key:generate` in the terminal.    
    6. Run `php artisan migrate`.Make sure that your server is running.
    7. Run `npm install`.
    8. Run `npm run dev`.
    9. Run `php artisan serve`.
    10. Now open `localhost:8000` in your browser.
