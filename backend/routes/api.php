<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*Route'/tasks', 'index']);
Route::get('/tasks/{id}', 'show']);
Route::post('/tasks', 'store']);
Route::put('/tasks/{id}', 'update']);
Route::delete('/tasks/{id}', 'destroy']);*/
Route::apiResource('tasks', TaskController::class);
// Route::apiResource('categories', CategoryController::class);
// Route::apiResource('tags', TagController::class);
// Route::apiResource('users', UserController::class);
