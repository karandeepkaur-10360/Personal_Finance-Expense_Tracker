package com.expense.expense_tracker.repository;

import com.expense.expense_tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUsername(String username);
    List<Expense> findByUsernameOrUsernameIsNull(String username);
}
