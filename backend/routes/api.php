<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\RouterController;
use App\Http\Controllers\RadioController;
use App\Http\Controllers\BSTController2;
use App\Http\Controllers\ONUController;
use App\Http\Controllers\OLTController;
use App\Http\Controllers\POPController;
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

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->middleware('cors');
    Route::post('register', [AuthController::class, 'register'])->middleware('cors');
    Route::get('logout', [AuthController::class, 'logout'])->middleware('cors');
});


Route::get('client', [ClientController::class, 'getAll'])->middleware('cors');
Route::post('client', [ClientController::class, 'store'])->middleware('cors');
Route::put('client', [ClientController::class, 'update'])->middleware('cors');
Route::post('client/delete', [ClientController::class, 'delete'])->middleware('cors');

Route::get('router', [RouterController::class, 'getAll'])->middleware('cors');
Route::post('router', [RouterController::class, 'store'])->middleware('cors');
Route::put('router', [RouterController::class, 'update'])->middleware('cors');
Route::post('router/delete', [RouterController::class, 'delete'])->middleware('cors');

Route::get('radio', [RadioController::class, 'getAll'])->middleware('cors');
Route::post('radio', [RadioController::class, 'store'])->middleware('cors');
Route::put('radio', [RadioController::class, 'update'])->middleware('cors');
Route::post('radio/delete', [RadioController::class, 'delete'])->middleware('cors');

Route::get('bst', [BSTController2::class, 'getAll'])->middleware('cors');
Route::post('bst', [BSTController2::class, 'store'])->middleware('cors');
Route::put('bst', [BSTController2::class, 'update'])->middleware('cors');
Route::post('bst/delete', [BSTController2::class, 'delete'])->middleware('cors');


Route::get('pop', [POPController::class, 'getAll'])->middleware('cors');
Route::post('pop', [POPController::class, 'store'])->middleware('cors');
Route::put('pop', [POPController::class, 'update'])->middleware('cors');
Route::post('pop/delete', [POPController::class, 'delete'])->middleware('cors');

Route::get('onu', [ONUController::class, 'getAll'])->middleware('cors');
Route::post('onu', [ONUController::class, 'store'])->middleware('cors');
Route::put('onu', [ONUController::class, 'update'])->middleware('cors');
Route::post('onu/delete', [ONUController::class, 'delete'])->middleware('cors');

Route::get('olt', [OLTController::class, 'getAll'])->middleware('cors');
Route::post('olt', [OLTController::class, 'store'])->middleware('cors');
Route::put('olt', [OLTController::class, 'update'])->middleware('cors');
Route::post('olt/delete', [OLTController::class, 'delete'])->middleware('cors');