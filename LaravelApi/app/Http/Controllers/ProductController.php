<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = $request->only(['name', 'price', 'description']);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('products', 'public');
            $data['photo_path'] = $path;
        }

        return Product::create($data);
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = $request->only(['name', 'price', 'description']);

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($product->photo_path) {
                Storage::disk('public')->delete($product->photo_path);
            }

            $path = $request->file('photo')->store('products', 'public');
            $data['photo_path'] = $path;
        }

        $product->update($data);
        return $product;
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Delete photo if exists
        if ($product->photo_path) {
            Storage::disk('public')->delete($product->photo_path);
        }

        return Product::destroy($id);
    }
}
