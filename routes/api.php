<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\loginController;
use App\Http\Controllers\MyPostController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/logincheck', [loginController::class, 'verify']);
Route::post('register', [loginController::class, 'register']);

Route::get('posts', [PostController::class, 'index']);
Route::get('myposts', [MyPostController::class, 'index']);

Route::post('addpost', [MyPostController::class, 'store']);
Route::delete('myposts/delete/{id}', [MyPostController::class, 'destroy']);
Route::get('myposts/edit/{id}', [MyPostController::class, 'edit']);
Route::post('myposts/edit/{id}', [MyPostController::class, 'update']);

Route::get('posts/{id}', [PostController::class, 'show']);

Route::post('posts/addcomment', [CommentController::class, 'store']);
Route::get('posts/comments/{id}', [CommentController::class, 'show']);
