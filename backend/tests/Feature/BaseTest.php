<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BaseTest extends TestCase
{
    
     // Test login endpoint
     
    public function test_login_endpoint(): void
    {
        $response = $this->post('/api/auth/login', [
            'email' => 'test@example.com',
            'password' => 'password'
        ]);

        $response->assertStatus(401); // Should fail with invalid credentials
    }

    
      //Test register endpoint
     
    public function test_register_endpoint(): void
    {
        $response = $this->post('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);

        $response->assertStatus(422); // Should fail without proper validation
    }

    
      //Test products endpoint
    
    public function test_products_endpoint(): void
    {
        $response = $this->get('/api/products');
        $response->assertStatus(200);
    }
} 