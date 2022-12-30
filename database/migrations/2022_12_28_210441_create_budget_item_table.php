<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("budget_items", function (Blueprint $table) {
            $table->id();
            $table->string("subject");
            $table->string("description")->nullable();
            $table->unsignedDecimal("amount", 8, 2);
            $table->string("currency", 3);
            $table->string("type");
            $table->unsignedInteger("budget_id");
            $table->unsignedBigInteger("team_id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("budget_items");
    }
};
