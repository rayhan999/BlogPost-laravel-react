<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class MyPostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req)
    {
        error_log("------------------------------------");

        $value = $req->cookie('uname');
        $myposts = Post::where('creator', $value)->get();
        return $myposts;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        $value = $req->cookie('uname');
        // $post_create = array();
        // $post_create['title'] = $req->title;
        // $post_create['description'] = $req->description;
        // $post_create['creator'] = $value;
        // $post = DB::table('posts')->insert($post_create);
        // if ($post) {
        //     // error_log($user);
        //     return true;
        // } else {
        //     return false;
        // }
        $post = new Post();
        $post->title = $req->title;
        $post->description = $req->description;
        $post->creator = $value;
        $post->save();
        if ($post) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
