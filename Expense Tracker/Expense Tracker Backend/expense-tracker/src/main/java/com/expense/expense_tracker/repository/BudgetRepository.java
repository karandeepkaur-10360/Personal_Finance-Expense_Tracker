package com.expense.expense_tracker.repository;

import com.expense.expense_tracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Optional<Budget> findByUsernameAndMonth(String username, String month);
    List<Budget> findByUsername(String username);
}
