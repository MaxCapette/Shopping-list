<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         return Task::all()->load('category');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Task::findOrFail($id)->load('category');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|between:3,255',
             'category_id' => 'nullable|integer|exists:categories,id'
        ]);
        // Create the task
        $task = Task::create([
            'title' => $validatedData['title'],
            'category_id' => $validatedData['category_id']
        ]);
        return $task->load('category'); // return the task with its category and tags
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Find the task by id and update
        $task = Task::findOrFail($id);
        // Validate the request data
        $validatedData = $request->validate([
            'title' => 'required|string|between:3,255',
             'category_id' => 'nullable|integer|exists:categories,id'

        ]);

        $task->title = $validatedData['title'];
        $task->category_id = $validatedData['category_id'];


        $task->save();

        return $task->load('category');;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    // Find the task by id
    $task = Task::findOrFail($id);
    // $task->tags()->detach();
    $task->delete();
    return response()->noContent();
    }
}
