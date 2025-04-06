
import React from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import QuestionForm from "@/components/question/QuestionForm";
import QuestionBankHeader from '@/components/question/QuestionBankHeader';
import QuestionBankTabs from '@/components/question/QuestionBankTabs';
import { useQuestionBank } from '@/hooks/useQuestionBank';

const QuestionBank = () => {
  const {
    activeTab,
    searchQuery,
    filteredQuestions,
    isAddingQuestion,
    isEditing,
    isViewOnly,
    selectedQuestion,
    isLoading,
    handleAddQuestion,
    handleEditQuestion,
    handleViewQuestion,
    handleDuplicateQuestion,
    handleSaveQuestion,
    handleDeleteQuestion,
    handleSearch,
    handleTabChange,
    handleCancel
  } = useQuestionBank();

  if (isLoading) {
    return (
      <DashboardLayout title="Bank Soal">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Memuat data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Bank Soal">
      <div className="space-y-6">
        {isAddingQuestion ? (
          <QuestionForm 
            initialValues={selectedQuestion} 
            onSubmit={handleSaveQuestion} 
            onCancel={handleCancel}
            isEditing={isEditing}
            isViewOnly={isViewOnly}
          />
        ) : (
          <>
            <QuestionBankHeader 
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              onAddQuestion={handleAddQuestion}
            />

            <QuestionBankTabs 
              activeTab={activeTab}
              onTabChange={handleTabChange}
              filteredQuestions={filteredQuestions}
              onViewQuestion={handleViewQuestion}
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onDuplicateQuestion={handleDuplicateQuestion}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default QuestionBank;
