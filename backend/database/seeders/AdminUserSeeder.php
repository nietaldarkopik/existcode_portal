<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $role = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);

        $admin = User::firstOrCreate(
            ['email' => 'admin@existcode.id'],
            ['name' => 'Existcode Admin', 'password' => 'password']
        );

        if (! $admin->hasRole('admin')) {
            $admin->assignRole($role);
        }
    }
}
