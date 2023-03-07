<?php

namespace App\Http\Controllers;

use App\Models\File;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\StoreFileRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateFileRequest;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Files/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'file' => 'required|mimes:jpeg,png,jpg,pdf,docx|max:2048',
        ]);

        // Get the file from the request
        $file = $request->file('file');

        // Generate a unique file name
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();

        // Store the file on the disk
        Storage::disk('public')->putFileAs('uploads', $file, $filename);

        // Return a response with the file URL
        $url = Storage::disk('public')->url('uploads/' . $filename);
        return response()->json(['url' => $url]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFileRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFileRequest $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        //
    }
}
