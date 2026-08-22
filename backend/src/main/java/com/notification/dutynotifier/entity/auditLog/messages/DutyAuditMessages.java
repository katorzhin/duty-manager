package com.notification.dutynotifier.entity.auditLog.messages;

import com.notification.dutynotifier.entity.duty.Duty;
import com.notification.dutynotifier.entity.employee.Employee;

import java.util.List;
import java.util.stream.Collectors;

public final class DutyAuditMessages {

    private DutyAuditMessages() {
    }

    public static String created(Duty duty) {
        return "Created " + format(duty);
    }

    public static String updated(String oldDuty, Duty newDuty) {

        return """
                Edited from:
                %s
                
                To:
                %s
                """.formatted(oldDuty, format(newDuty));
    }

    public static String deleted(Duty duty) {
        return "Deleted " + format(duty);
    }

    public static String format(Duty duty) {

        return duty.getDutyDate()
                + " -> "
                + duty.getEmployees()
                .stream()
                .map(Employee::getName)
                .collect(Collectors.joining(", "));
    }

    public static String generatedSchedule(List<Duty> duties) {
        return "Generated duties:\n"
                + duties.stream()
                .map(DutyAuditMessages::format)
                .collect(Collectors.joining("\n"));
    }
}