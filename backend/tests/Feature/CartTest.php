<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CartTest extends TestCase
{
    
     //Test add item to cart
     
    public function test_add_item_to_cart(): void
    {
        $response = $this->post('/api/cart/add', [
            'product_id' => 1,
            'quantity' => 2
        ]);

        $response->assertStatus(401); // Should fail without authentication
    }

    
     //Test get cart items
    
    public function test_get_cart_items(): void
    {
        $response = $this->get('/api/cart');
        $response->assertStatus(401); // Should fail without authentication
    }

    
     //Test remove item from cart
  
    public function test_remove_item_from_cart(): void
    {
        $response = $this->delete('/api/cart/remove/1');
        $response->assertStatus(401); // Should fail without authentication
    }
} 