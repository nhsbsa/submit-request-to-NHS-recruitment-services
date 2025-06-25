// ********************************
// HRSS (VERSION 1)
// ********************************

// External dependencies
const express = require('express');
const { DateTime } = require("luxon");
const router = express.Router();

// Calculate cut-off dates

// Get the current date
const currentDate = DateTime.now();

// Calculate the first day of the next month
const firstDayOfNextMonth = currentDate.plus({ months: 1 }).startOf('month');

// Calculate the last day of the current month
const lastDayOfCurrentMonth = firstDayOfNextMonth.minus({ days: 1 });

// Find the last Friday by subtracting days from the last day until it's a Friday (weekday 5)
let cutOffDate = lastDayOfCurrentMonth;
while (cutOffDate.weekday !== 5) {
  cutOffDate = cutOffDate.minus({ days: 1 });
}

// Start Page

router.post('/v1/start-page', function (req, res) {

  req.session.data['cutOffDate'] = cutOffDate.toFormat('d MMMM yyyy');

  res.redirect('/v1/authentication-sign-in')

})

// Before you start

router.post('/v1/before-you-start', function (req, res) {

  res.redirect('/v1/requestor-name')

})

// Requestor Name

router.post('/v1/requestor-name', function (req, res) {

  var requestorFirsttName = req.session.data['requestorFirstName'];
  var requestorLastName = req.session.data['requestorLastName'];

  if (requestorFirsttName && requestorLastName) {
    res.redirect('/v1/employee-name')
  } else {
    res.redirect('/v1/requestor-name')
  }

})

// Employee Name

router.post('/v1/employee-name', function (req, res) {

  var employeeTitle = req.session.data['employeeTitle'];
  var employeeFirsttName = req.session.data['employeeFirstName'];
  var employeeLastName = req.session.data['employeeLastName'];

  if (employeeTitle && employeeFirsttName && employeeLastName) {
    res.redirect('/v1/employee-position-number')
  } else {
    res.redirect('/v1/employee-name')
  }

})

// Employee Position Number

router.post('/v1/employee-position-number', function (req, res) {

  var employeePositionNumber = req.session.data['employeePositionNumber'];

  if (employeePositionNumber) {
    res.redirect('/v1/employee-payroll-number')
  } else {
    res.redirect('/v1/employee-position-number')
  }

})

// Employee Payroll Number

router.post('/v1/employee-payroll-number', function (req, res) {

  var employeePayrollNumberRadio = req.session.data['employeePayrollNumberRadio'];
  var employeePayrollNumber = req.session.data['employeePayrollNumber'];

  if (employeePayrollNumberRadio == "Yes" && employeePayrollNumber || (employeePayrollNumberRadio == "No")) {
    res.redirect('/v1/employee-job-title')
  } else {
    res.redirect('/v1/employee-payroll-number')
  }

})

// Employee Job Title

router.post('/v1/employee-job-title', function (req, res) {

  var employeeJobTitle = req.session.data['employeeJobTitle'];

  if (employeeJobTitle) {
    res.redirect('/v1/employee-cost-centre')
  } else {
    res.redirect('/v1/employee-job-title')
  }

})

// Employee Cost Centre

router.post('/v1/employee-cost-centre', function (req, res) {

  var employeeCostCentre = req.session.data['employeeCostCentre'];

  if (employeeCostCentre) {
    res.redirect('/v1/change-type')
  } else {
    res.redirect('/v1/employee-cost-centre')
  }

})

// Change Type

router.post('/v1/change-type', function (req, res) {

  var changeType = req.session.data['change-type'];

  if (changeType == 'abscence-removal') {
    res.redirect('/v1/date-of-abscence')
  } else if (changeType == 'allowances') {
    res.redirect('/v1/allowance-type')
  } else if (changeType == 'band-or-grade') {
    res.redirect('/v1/band-or-grade-type')
  } else if (changeType == 'cost-centre') {
    res.redirect('/v1/new-cost-centre')
  } else if (changeType == 'extension-of-probation') {
    res.redirect('/v1/change-effective-from')
  } else if (changeType == 'future-date-changes') {
    res.redirect('/v1/future-date-change')
  } else if (changeType == 'hours') {
    res.redirect('/v1/new-hours-pattern')
  } else if (changeType == 'pay-step-point') {
    res.redirect('/v1/change-effective-from')
  } else if (changeType == 'upaid-leave-career-break') {
    res.redirect('/v1/leave-or-break-type')
  } else if (changeType == 'other') {
    res.redirect('/v1/what-other-change')
  } else {
    res.redirect('/v1/change-type')
  }

})

// Date of Abscence

router.post('/v1/date-of-abscence', function (req, res) {

  var dateOfAbscenceDay = req.session.data['date-of-abscence-day']?.day;
  var dateOfAbscenceMonth = req.session.data['date-of-abscence-month']?.month;
  var dateOfAbscenceYear = req.session.data['date-of-abscence-year']?.year;

  try {

    if (/^\d+$/.test(dateOfAbscenceDay) && /^\d+$/.test(dateOfAbscenceMonth) && /^\d+$/.test(dateOfAbscenceYear)) {

      req.session.data['dateOfAbscence'] = DateTime.fromObject({
        day: dateOfAbscenceDay,
        month: dateOfAbscenceMonth,
        year: dateOfAbscenceYear
      }).toFormat("d MMMM yyyy");

      res.redirect('/v1/change-effective-from')
    } else {
      res.redirect('/v1/date-of-abscence')
    }

  } catch (err) {

    res.redirect('/v1/date-of-abscence')

  }

})

// Change Effective From

router.post('/v1/change-effective-from', function (req, res) {

  var changeEffectiveFromDay = req.session.data['change-effective-from-day']?.day;
  var changeEffectiveFromMonth = req.session.data['change-effective-from-month']?.month;
  var changeEffectiveFromYear = req.session.data['change-effective-from-year']?.year;

  try {

    if (/^\d+$/.test(changeEffectiveFromDay) && /^\d+$/.test(changeEffectiveFromMonth) && /^\d+$/.test(changeEffectiveFromYear)) {

      req.session.data['changeEffectiveFrom'] = DateTime.fromObject({
        day: changeEffectiveFromDay,
        month: changeEffectiveFromMonth,
        year: changeEffectiveFromYear
      }).toFormat("d MMMM yyyy");

      res.redirect('/v1/temporary-change')
    } else {
      res.redirect('/v1/change-effective-from')
    }

  } catch (err) {

    res.redirect('/v1/change-effective-from')

  }

})

// Temporary Change

router.post('/v1/temporary-change', function (req, res) {

  var temporaryChange = req.session.data['temporary-change'];

  if (temporaryChange == 'Yes') {
    res.redirect('/v1/change-effective-until')
  } else if (temporaryChange == 'No') {
    res.redirect('/v1/letter')
  } else {
    res.redirect('/v1/temporary-change')
  }

})

// Change Effective Until

router.post('/v1/change-effective-until', function (req, res) {

  var changeEffectiveUntilDay = req.session.data['change-effective-until-day']?.day;
  var changeEffectiveUntilMonth = req.session.data['change-effective-until-month']?.month;
  var changeEffectiveUntilYear = req.session.data['change-effective-until-year']?.year;

  try {

    if (/^\d+$/.test(changeEffectiveUntilDay) && /^\d+$/.test(changeEffectiveUntilMonth) && /^\d+$/.test(changeEffectiveUntilYear)) {

      req.session.data['changeEffectiveUntil'] = DateTime.fromObject({
        day: changeEffectiveUntilDay,
        month: changeEffectiveUntilMonth,
        year: changeEffectiveUntilYear
      }).toFormat("d MMMM yyyy");

      res.redirect('/v1/letter')
    } else {
      res.redirect('/v1/change-effective-until')
    }

  } catch (err) {

    res.redirect('/v1/change-effective-until')

  }

})

// Email

router.post('/v1/email', function (req, res) {

  var email = req.session.data['email'];

  if (email == 'Yes') {
    res.redirect('/v1/additional-information')
  } else if (email == 'No') {
    res.redirect('/v1/additional-information')
  } else {
    res.redirect('/v1/email')
  }

})

// Letter

router.post('/v1/letter', function (req, res) {

  var letter = req.session.data['letter'];

  if (letter == 'Yes') {
    res.redirect('/v1/additional-information')
  } else if (letter == 'No') {
    res.redirect('/v1/additional-information')
  } else {
    res.redirect('/v1/letter')
  }

})

// Additional Information

router.post('/v1/additional-information', function (req, res) {

  var additionalInformation = req.session.data['additional-information'];

  res.redirect('/v1/additional-change')

})

// Additional Change

router.post('/v1/additional-change', function (req, res) {

  var additionalChange = req.session.data['additional-change'];

  if (additionalChange == 'Yes') {
    res.redirect('/v1/change-type')
  } else if (additionalChange == 'No') {
    res.redirect('/v1/authoriser-name')
  } else {
    res.redirect('/v1/additional-change')
  }

})

// Authoriser Name

router.post('/v1/authoriser-name', function (req, res) {

  var authoriserFirsttName = req.session.data['authoriserFirstName'];
  var authoriserLastName = req.session.data['authoriserLastName'];

  if (authoriserFirsttName && authoriserLastName) {
    res.redirect('/v1/authoriser-job-title')
  } else {
    res.redirect('/v1/authoriser-name')
  }

})

// Authoriser Job Title

router.post('/v1/authoriser-job-title', function (req, res) {

  var authoriserJobTitle = req.session.data['authoriserJobTitle'];

  if (authoriserJobTitle) {
    res.redirect('/v1/authoriser-email-address')
  } else {
    res.redirect('/v1/authoriser-job-title')
  }

})

// Authoriser Email Address

router.post('/v1/authoriser-email-address', function (req, res) {

  var authoriserEmail = req.session.data['authoriser-email-address'];

  if (authoriserEmail) {
    res.redirect('/v1/check-your-answers')
  } else {
    res.redirect('/v1/authoriser-email-address')
  }

})

// Check Your Answers

router.post('/v1/check-your-answers', function (req, res) {

  res.redirect('/v1/confirmation-successful')

})


// Delete Change Request

router.post('/v1/delete-your-change-request', function (req, res) {

  var deleteYourDocument = req.session.data['delete-your-change-request'];

  if (deleteYourDocument == "yes") {
      res.redirect('/v1/change-type');
  } else if (deleteYourDocument == "no") {
      res.redirect('/v1/check-your-answers');
  } else {
      res.redirect('/v1/change-type');
  }

})

// Allowance Type

router.post('/v1/allowance-type', function (req, res) {

  var allowanceType = req.session.data['allowance-type'];

  if (allowanceType == 'clinical-excellence-award' || allowanceType == 'discretionary-points' || allowanceType == 'distinction-awards' || allowanceType == 'long-term-recruitment' || allowanceType == 'on-call-allowance' || allowanceType == 'short-term-recruitment' || allowanceType == 'shift-allowance') {
    res.redirect('/v1/salary-percentage-amount')
  } else if (allowanceType == 'other') {
    res.redirect('/v1/allowance-type-information')
  } else if (allowanceType == 'hca-allowance-inner' || allowanceType == 'hca-allowance-outer' || allowanceType == 'hca-allowance-fringe' || allowanceType == 'hca-allowance-medical') {
    res.redirect('/v1/senior-finance-lead')
  } else {
    res.redirect('/v1/allowance-type')
  }

})

// Allowance type information

router.post('/v1/allowance-type-information', function (req, res) {

  var allowanceTypeInformation = req.session.data['allowance-type-information'];

  if (allowanceTypeInformation) {
    res.redirect('/v1/salary-percentage-amount')
  } else {
    res.redirect('/v1/allowance-type-information')
  }

})

// Salary percentage amount

router.post('/v1/salary-percentage-amount', function (req, res) {

  var salaryAmount = req.session.data['amount'];
  var salaryFrequency = req.session.data['salary-percentage-frequency'];

  if (salaryAmount && salaryFrequency) {
    res.redirect('/v1/senior-finance-lead')
  } else {
    res.redirect('/v1/salary-percentage-amount')
  }

})

// Senior finance lead

router.post('/v1/senior-finance-lead', function (req, res) {

  var financeLeadFirstName = req.session.data['financeLeadFirstName'];
  var financeLeadLastName = req.session.data['financeLeadLastName'];
  var financeLeadEmailAddress = req.session.data['financeLead-email-address'];

  var allowanceType = req.session.data['allowance-type'];

  if (financeLeadFirstName && financeLeadLastName && financeLeadEmailAddress) {
    res.redirect('/v1/change-effective-from')
  } else {
    res.redirect('/v1/senior-finance-lead')
  }

})

// Band or Grade type

router.post('/v1/band-or-grade-type', function (req, res) {

  var bandGradeType = req.session.data['band-or-grade-type'];

  if (bandGradeType) {
    res.redirect('/v1/new-position-number')
  } else {
    res.redirect('/v1/band-or-grade-type')
  }

})

// New position number (1)

router.post('/v1/new-position-number', function (req, res) {

  var newPositionNumber = req.session.data['newPositionNumber'];

  if (newPositionNumber) {
    res.redirect('/v1/new-pay-band')
  } else {
    res.redirect('/v1/new-position-number')
  }

})

// New pay band

router.post('/v1/new-pay-band', function (req, res) {

  var newPayBand = req.session.data['new-pay-band'];

  if (newPayBand) {
    res.redirect('/v1/new-step-point')
  } else {
    res.redirect('/v1/new-pay-band')
  }

})

// New step point

router.post('/v1/new-step-point', function (req, res) {

  var newStepPoint = req.session.data['newStepPoint'];

  // Check if newStepPoint is entered and is a valid value (1–7)
  if (newStepPoint && ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(newStepPoint)) {
    res.redirect('/v1/new-salary-amount');
  } else {
    res.redirect('/v1/new-step-point');
  }

})

// New salary amount

router.post('/v1/new-salary-amount', function (req, res) {

  var newSalaryAmount = req.session.data['newSalaryAmount'];

  if (newSalaryAmount) {
    res.redirect('/v1/change-effective-from')
  } else {
    res.redirect('/v1/new-salary-amount')
  }

})

// New cost centre

router.post('/v1/new-cost-centre', function (req, res) {

  var newCostCentre = req.session.data['newCostCentre'];

  if (newCostCentre) {
    res.redirect('/v1/new-position-number-2')
  } else {
    res.redirect('/v1/new-cost-centre')
  }

})

// New position number (1)

router.post('/v1/new-position-number-2', function (req, res) {

  var newPositionNumber2 = req.session.data['newPositionNumber2'];

  if (newPositionNumber2) {
    res.redirect('/v1/change-effective-from')
  } else {
    res.redirect('/v1/new-position-number-2')
  }

})

// Future date change

router.post('/v1/future-date-change', function (req, res) {

  var futureDateChangeDay = req.session.data['future-date-change-day']?.day;
  var futureDateChangeMonth = req.session.data['future-date-change-month']?.month;
  var futureDateChangeYear = req.session.data['future-date-change-year']?.year;

  try {

    if (/^\d+$/.test(futureDateChangeDay) && /^\d+$/.test(futureDateChangeMonth) && /^\d+$/.test(futureDateChangeYear)) {

      req.session.data['futureDateChange'] = DateTime.fromObject({
        day: futureDateChangeDay,
        month: futureDateChangeMonth,
        year: futureDateChangeYear
      }).toFormat("d MMMM yyyy");

      res.redirect('/v1/change-effective-from')
    } else {
      res.redirect('/v1/future-date-change')
    }

  } catch (err) {

    res.redirect('/v1/future-date-change')

  }

})

// Type of hours change

router.post('/v1/type-of-hour-change', function (req, res) {

  var hourChangeType = req.session.data['type-of-hour-change'];

  if (hourChangeType) {
    res.redirect('/v1/new-hours-pattern')
  } else {
    res.redirect('/v1/type-of-hour-change')
  }

})

// New hours pattern

router.post('/v1/new-hours-pattern', function (req, res) {

  var numberOfHours = req.session.data['number-of-hours'];
  var workingPattern = req.session.data['working-pattern'];

  if (workingPattern == 'Changes to term time') {
    res.redirect('/v1/upload-document')
  } else if (workingPattern == 'Flexible working' || workingPattern == 'Annualised hours' || workingPattern == 'Condensed hours') {
    res.redirect('/v1/change-effective-from')
  } else {
    res.redirect('/v1/new-hours-pattern')
  }

})

// Upload document

router.post('/v1/upload-document', function (req, res) {

    res.redirect('/v1/documents-added')

})

// Documents added

router.post('/v1/documents-added', function (req, res) {

  res.redirect('/v1/change-effective-from')

})

// Delete Document

router.post('/v1/delete-your-document', function (req, res) {

  var deleteYourDocument = req.session.data['delete-your-document'];

  if (deleteYourDocument == "yes") {
      res.redirect('/v1/upload-document');
  } else if (deleteYourDocument == "no") {
      res.redirect('/v1/documents-added');
  } else {
      res.redirect('/v1/upload-document');
  }

})

// Leave or Break type

router.post('/v1/leave-or-break-type', function (req, res) {

  var leaveBreakType = req.session.data['leave-or-break-type'];

  if (leaveBreakType == 'Due to take a career break') {
    res.redirect('/v1/upload-document')
  } else if (leaveBreakType == 'Currently on a career break') {
    res.redirect('/v1/career-break-update')
  } else if (leaveBreakType == 'Due to to take unpaid leave') {
    res.redirect('/v1/change-effective-from')
  } else {
    res.redirect('/v1/leave-or-break-type')
  }

})

// Career break update

router.post('/v1/career-break-update', function (req, res) {

  var careerBreakUpdate = req.session.data['career-break-update'];

  if (careerBreakUpdate == 'Extend the career break') {
    res.redirect('/v1/career-break-extended-until')
  } else if (careerBreakUpdate == 'Provide an agreed return to work date and reinstate pay') {
    res.redirect('/v1/return-to-work-date')
  } else {
    res.redirect('/v1/career-break-update')
  }

})

// Career break extended until

router.post('/v1/career-break-extended-until', function (req, res) {

  var careerBreakExtendedUntilDay = req.session.data['career-break-extended-until-day']?.day;
  var careerBreakExtendedUntilMonth = req.session.data['career-break-extended-until-month']?.month;
  var careerBreakExtendedUntilYear = req.session.data['career-break-extended-until-year']?.year;

  try {

    if (/^\d+$/.test(careerBreakExtendedUntilDay) && /^\d+$/.test(careerBreakExtendedUntilMonth) && /^\d+$/.test(careerBreakExtendedUntilYear)) {

      req.session.data['careerBreakExtendedUntil'] = DateTime.fromObject({
        day: careerBreakExtendedUntilDay,
        month: careerBreakExtendedUntilMonth,
        year: careerBreakExtendedUntilYear
      }).toFormat("d MMMM yyyy");

      res.redirect('/v1/change-effective-from')
    } else {
      res.redirect('/v1/career-break-extended-until')
    }

  } catch (err) {

    res.redirect('/v1/career-break-extended-until')

  }

})

// Return to work date

router.post('/v1/return-to-work-date', function (req, res) {

  var returnToWorkDateDay = req.session.data['return-to-work-date-day']?.day;
  var returnToWorkDateMonth = req.session.data['return-to-work-date-month']?.month;
  var returnToWorkDateYear = req.session.data['return-to-work-date-year']?.year;

  try {

    if (/^\d+$/.test(returnToWorkDateDay) && /^\d+$/.test(returnToWorkDateMonth) && /^\d+$/.test(returnToWorkDateYear)) {

      req.session.data['returnToWorkDate'] = DateTime.fromObject({
        day: returnToWorkDateDay,
        month: returnToWorkDateMonth,
        year: returnToWorkDateYear
      }).toFormat("d MMMM yyyy");

      res.redirect('/v1/change-effective-from')
    } else {
      res.redirect('/v1/return-to-work-date')
    }

  } catch (err) {

    res.redirect('/v1/return-to-work-date')

  }

})

// Other change

router.post('/v1/what-other-change', function (req, res) {

  var whatOtherChange = req.session.data['what-other-change'];

  if (whatOtherChange) {
    res.redirect('/v1/other-change-information')
  } else {
    res.redirect('/v1/what-other-change')
  }

})

// Other change information

router.post('/v1/other-change-information', function (req, res) {

  var otherChangeInformation = req.session.data['other-change-information'];

  if (otherChangeInformation) {
    res.redirect('/v1/document-to-upload')
  } else {
    res.redirect('/v1/other-change-information')
  }

})

// Document to upload

router.post('/v1/document-to-upload', function (req, res) {

  var documentToUpload = req.session.data['document-to-upload'];

  if (documentToUpload == 'Yes') {
    res.redirect('/v1/upload-document')
  } else if (documentToUpload == 'No') {
    res.redirect('/v1/change-effective-from')
  } else {
    res.redirect('/v1/document-to-upload')
  }

})

// New starter form

router.post('/v1/new-starter-form', function (req, res) {

  var newStarterForm = req.session.data['new-starter-form'];

  if (newStarterForm) {
    res.redirect('/v1/upload-document')
  } else {
    res.redirect('/v1/new-starter-form')
  }

})

module.exports = router;