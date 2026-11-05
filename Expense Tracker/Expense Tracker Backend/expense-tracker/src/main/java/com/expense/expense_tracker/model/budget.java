package com.expense.expense_tracker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "budgets")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String month; // format: YYYY-MM (e.g. "2026-10")

    private double monthlyLimit;
    private double foodLimit;
    private double transportLimit;
    private double shoppingLimit;
    private double billsLimit;

    public Budget() {
    }

    public Budget(String username, String month, double monthlyLimit) {
        this.username = username;
        this.month = month;
        this.monthlyLimit = monthlyLimit;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public double getMonthlyLimit() {
        return monthlyLimit;
    }

    public void setMonthlyLimit(double monthlyLimit) {
        this.monthlyLimit = monthlyLimit;
    }

    public double getFoodLimit() {
        return foodLimit;
    }

    public void setFoodLimit(double foodLimit) {
        this.foodLimit = foodLimit;
    }

    public double getTransportLimit() {
        return transportLimit;
    }

    public void setTransportLimit(double transportLimit) {
        this.transportLimit = transportLimit;
    }

    public double getShoppingLimit() {
        return shoppingLimit;
    }

    public void setShoppingLimit(double shoppingLimit) {
        this.shoppingLimit = shoppingLimit;
    }

    public double getBillsLimit() {
        return billsLimit;
    }

    public void setBillsLimit(double billsLimit) {
        this.billsLimit = billsLimit;
    }
}
