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

        $image = $req->file('image');
        if ($image) {
            $image_name = date('dmy_H_s_i');
            $image_ext = strtolower($image->getClientOriginalExtension());
            $image_fullname = $image_name . '.' . $image_ext;
            $upload_path = 'assets/uploads/';
            $image_url = $upload_path . $image_fullname;
            $image_move = $image->move($upload_path, $image_fullname);
            if ($image_move) {
                $value = $req->cookie('uname');
                $post = new Post();
                $post->title = $req->title;
                $post->description = $req->description;
                $post->creator = $value;
                $post->image = $image_url;
                error_log("------------------------------------");
                error_log($post);
                $post->save();
                if ($post) {
                    return true;
                } else {
                    //     return false;
                    error_log("------------------------------------");
                    error_log("Not updated");
                }
            } else {
                //     return false;
                error_log("------------------------------------");
                error_log("image not move");
            }
        } else {
            //     return false;

            error_log("------------------------------------");
            error_log("image not found");
        }
        // $post->save();

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
        $editPost = Post::where('id', $id)->get();
        // error_log("------------------------------------");
        // error_log($id);
        return $editPost;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
        $value = $req->cookie('uname');
        $post = Post::find($id);
        error_log("------------------------------------");
        error_log($post);
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // error_log("------------------------------------");
        // error_log($id);
        $deletePost = Post::where('id', $id)->delete();
        if ($deletePost) {
            return true;
        } else {
            return false;
        }
    }
}
