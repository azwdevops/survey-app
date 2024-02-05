<?php

use App\Models\SurveyAnswer;
use App\Models\SurveyQuestion;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('survey_question_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(SurveyQuestion::class, 'survey_question_id');
            $table->foreignIdFor(SurveyAnswer::class, 'survey_answer_id');
            $table->text('answer');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('survey_question_answers');
    }
};
