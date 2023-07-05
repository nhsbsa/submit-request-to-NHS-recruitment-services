// ********************************
// HRSS (VERSION 2)
// ********************************

// External dependencies
const express = require('express');
const { DateTime } = require("luxon");
const router = express.Router();

// Sign In

router.post('/v2/sign-in', function (req, res) {

  var emailAddressSignIn = req.session.data['email-address-sign-in'];
  var passwordSignIn = req.session.data['password-sign-in'];

  if (emailAddressSignIn && passwordSignIn) {
    res.redirect('/v2/security-code')
  } else {
    res.redirect('/v2/sign-in')
  }

})

// Security code

router.post('/v2/security-code', function (req, res) {

  var securityCode = req.session.data['security-code'];

  if (securityCode) {
    res.redirect('/v2/start-page')
  } else {
    res.redirect('/v2/security-code')
  }

})

// Create account

router.post('/v2/create-account', function (req, res) {

  var firstNameCreateAccount = req.session.data['first-name-create-account'];
  var lastNameCreateAccount = req.session.data['last-name-create-account'];
  var emailAddressCreateAccount = req.session.data['email-address-create-account'];
  var passwordCreateAccount = req.session.data['password-create-account'];
  var confirmpasswordCreateAccount = req.session.data['confirm-password-create-account'];
  var comply = req.session.data['comply-create-account'];
  var privacyPolicy = req.session.data['privacy-policy-create-account'];

  if (passwordCreateAccount == confirmpasswordCreateAccount) {

    if (firstNameCreateAccount && lastNameCreateAccount && emailAddressCreateAccount && passwordCreateAccount && confirmpasswordCreateAccount && comply && privacyPolicy) {
      res.redirect('/v2/sign-in')
    } else {
      res.redirect('/v2/create-account')
    }

  } else {
    res.redirect('/v2/create-account')
  }

})

// Forgot password

router.post('/v2/forgot-password', function (req, res) {

  var forgotPassword = req.session.data['forgot-password'];

  if (forgotPassword) {
    res.redirect('/v2/check-your-email')
  } else {
    res.redirect('/v2/forgot-password')
  }

})

// Start Page

router.post('/v2/start-page', function (req, res) {

  res.redirect('/v2/employee-name')

})

// Employee Name

router.post('/v2/employee-name', function (req, res) {

  var employeeTitle = req.session.data['employeeTitle'];
  var employeeFirsttName = req.session.data['employeeFirstName'];
  var employeeLastName = req.session.data['employeeLastName'];

  if (employeeTitle && employeeFirsttName && employeeLastName) {
    res.redirect('/v2/employee-position-number')
  } else {
    res.redirect('/v2/employee-name')
  }

})

// Employee Position Number

router.post('/v2/employee-position-number', function (req, res) {

  var employeePositionNumber = req.session.data['employeePositionNumber'];

  if (employeePositionNumber) {
    res.redirect('/v2/employee-payroll-number')
  } else {
    res.redirect('/v2/employee-position-number')
  }

})

// Employee Payroll Number

router.post('/v2/employee-payroll-number', function (req, res) {

  var employeePayrollNumberRadio = req.session.data['employeePayrollNumberRadio'];
  var employeePayrollNumber = req.session.data['employeePayrollNumber'];

  if (employeePayrollNumberRadio == "Yes" && employeePayrollNumber || (employeePayrollNumberRadio == "No")) {
    res.redirect('/v2/employee-job-title')
  } else {
    res.redirect('/v2/employee-payroll-number')
  }

})

// Employee Job Title

router.post('/v2/employee-job-title', function (req, res) {

  var employeeJobTitle = req.session.data['employeeJobTitle'];

  if (employeeJobTitle) {
    res.redirect('/v2/employee-cost-centre')
  } else {
    res.redirect('/v2/employee-job-title')
  }

})

// Employee Cost Centre

router.post('/v2/employee-cost-centre', function (req, res) {

  var employeeCostCentre = req.session.data['employeeCostCentre'];

  if (employeeCostCentre) {
    res.redirect('/v2/change-type')
  } else {
    res.redirect('/v2/employee-cost-centre')
  }

})

// Change Type

router.post('/v2/change-type', function (req, res) {

  var changeType = req.session.data['change-type'];

  if (changeType == 'abscence-removal') {
    res.redirect('/v2/date-of-abscence')
  } else if (changeType == 'allowances') {
    res.redirect('/v2/allowance-type')
  } else if (changeType == 'band-or-grade') {
    res.redirect('/v2/band-or-grade-type')
  } else if (changeType == 'cost-centre') {
    res.redirect('/v2/new-cost-centre')
  } else if (changeType == 'extension-of-probation') {
    res.redirect('/v2/change-effective-from')
  } else if (changeType == 'future-date-changes') {
    res.redirect('/v2/future-date-change')
  } else if (changeType == 'hours') {
    res.redirect('/v2/new-hours-pattern')
  } else if (changeType == 'maternity-paternity') {
    res.redirect('/v2/upload-document')
  } else if (changeType == 'pay-step-point') {
    res.redirect('/v2/change-effective-from')
  } else if (changeType == 'upaid-leave-career-break') {
    res.redirect('/v2/leave-or-break-type')
  } else if (changeType == 'other') {
    res.redirect('/v2/what-other-change')
  } else {
    res.redirect('/v2/change-type')
  }

})

// Date of Abscence

router.post('/v2/date-of-abscence', function (req, res) {

  var dateOfAbscenceDay = req.session.data['date-of-abscence-day'];
  var dateOfAbscenceMonth = req.session.data['date-of-abscence-month'];
  var dateOfAbscenceYear = req.session.data['date-of-abscence-year'];

  if (!isNaN(dateOfAbscenceDay) && !isNaN(dateOfAbscenceMonth) && !isNaN(dateOfAbscenceYear)) {

    req.session.data['dateOfAbscence'] = DateTime.fromObject({
      day: dateOfAbscenceDay,
      month: dateOfAbscenceMonth,
      year: dateOfAbscenceYear
    }).toFormat("d MMMM yyyy");

    res.redirect('/v2/change-effective-from')
  } else {
    res.redirect('/v2/date-of-abscence')
  }

})

// Change Effective From

router.post('/v2/change-effective-from', function (req, res) {

  var changeEffectiveFromDay = req.session.data['change-effective-from-day'];
  var changeEffectiveFromMonth = req.session.data['change-effective-from-month'];
  var changeEffectiveFromYear = req.session.data['change-effective-from-year'];

  if (!isNaN(changeEffectiveFromDay) && !isNaN(changeEffectiveFromMonth) && !isNaN(changeEffectiveFromYear)) {

    req.session.data['changeEffectiveFrom'] = DateTime.fromObject({
      day: changeEffectiveFromDay,
      month: changeEffectiveFromMonth,
      year: changeEffectiveFromYear
    }).toFormat("d MMMM yyyy");

    res.redirect('/v2/temporary-change')
  } else {
    res.redirect('/v2/change-effective-from')
  }

})

// Temporary Change

router.post('/v2/temporary-change', function (req, res) {

  var temporaryChange = req.session.data['temporary-change'];

  if (temporaryChange == 'Yes') {
    res.redirect('/v2/change-effective-until')
  } else if (temporaryChange == 'No') {
    res.redirect('/v2/letter')
  } else {
    res.redirect('/v2/temporary-change')
  }

})

// Change Effective Until

router.post('/v2/change-effective-until', function (req, res) {

  var changeEffectiveUntilDay = req.session.data['change-effective-until-day'];
  var changeEffectiveUntilMonth = req.session.data['change-effective-until-month'];
  var changeEffectiveUntilYear = req.session.data['change-effective-until-year'];

  if (!isNaN(changeEffectiveUntilDay) && !isNaN(changeEffectiveUntilMonth) && !isNaN(changeEffectiveUntilYear)) {

    req.session.data['changeEffectiveUntil'] = DateTime.fromObject({
      day: changeEffectiveUntilDay,
      month: changeEffectiveUntilMonth,
      year: changeEffectiveUntilYear
    }).toFormat("d MMMM yyyy");

    res.redirect('/v2/letter')
  } else {
    res.redirect('/v2/change-effective-until')
  }

})

// Email

router.post('/v2/email', function (req, res) {

  var email = req.session.data['email'];

  if (email == 'Yes') {
    res.redirect('/v2/additional-information')
  } else if (email == 'No') {
    res.redirect('/v2/additional-information')
  } else {
    res.redirect('/v2/email')
  }

})

// Letter

router.post('/v2/letter', function (req, res) {

  var letter = req.session.data['letter'];

  if (letter == 'Yes') {
    res.redirect('/v2/additional-information')
  } else if (letter == 'No') {
    res.redirect('/v2/additional-information')
  } else {
    res.redirect('/v2/letter')
  }

})

// Additional Information

router.post('/v2/additional-information', function (req, res) {

  var additionalInformation = req.session.data['additional-information'];

  res.redirect('/v2/additional-change')

})

// Additional Change

router.post('/v2/additional-change', function (req, res) {

  var additionalChange = req.session.data['additional-change'];

  if (additionalChange == 'Yes') {
    res.redirect('/v2/change-type')
  } else if (additionalChange == 'No') {
    res.redirect('/v2/authoriser-name')
  } else {
    res.redirect('/v2/additional-change')
  }

})

// Authoriser Name

router.post('/v2/authoriser-name', function (req, res) {

  var authoriserFirsttName = req.session.data['authoriserFirstName'];
  var authoriserLastName = req.session.data['authoriserLastName'];

  if (authoriserFirsttName && authoriserLastName) {
    res.redirect('/v2/authoriser-job-title')
  } else {
    res.redirect('/v2/authoriser-name')
  }

})

// Authoriser Job Title

router.post('/v2/authoriser-job-title', function (req, res) {

  var authoriserJobTitle = req.session.data['authoriserJobTitle'];

  if (authoriserJobTitle) {
    res.redirect('/v2/authoriser-email-address')
  } else {
    res.redirect('/v2/authoriser-job-title')
  }

})

// Authoriser Email Address

router.post('/v2/authoriser-email-address', function (req, res) {

  var authoriserEmail = req.session.data['authoriser-email-address'];

  if (authoriserEmail) {
    res.redirect('/v2/check-your-answers')
  } else {
    res.redirect('/v2/authoriser-email-address')
  }

})

// Check Your Answers

router.post('/v2/check-your-answers', function (req, res) {

  res.redirect('/v2/confirmation-successful')

})

// Allowance Type

router.post('/v2/allowance-type', function (req, res) {

  var allowanceType = req.session.data['allowance-type'];

  if (allowanceType == 'clinical-excellence-award' || allowanceType == 'discretionary-points' || allowanceType == 'distinction-awards' || allowanceType == 'long-term-recruitment' || allowanceType == 'on-call-allowance' || allowanceType == 'short-term-recruitment' || allowanceType == 'shift-allowance') {
    res.redirect('/v2/salary-percentage-amount')
  } else if (allowanceType == 'other') {
    res.redirect('/v2/allowance-type-information')
  } else if (allowanceType == 'hca-allowance-inner' || allowanceType == 'hca-allowance-outer' || allowanceType == 'hca-allowance-fringe' || allowanceType == 'hca-allowance-medical') {
    res.redirect('/v2/senior-finance-lead')
  } else {
    res.redirect('/v2/allowance-type')
  }

})

// Allowance type information

router.post('/v2/allowance-type-information', function (req, res) {

  var allowanceTypeInformation = req.session.data['allowance-type-information'];

  if (allowanceTypeInformation) {
    res.redirect('/v2/salary-percentage-amount')
  } else {
    res.redirect('/v2/allowance-type-information')
  }

})

// Salary percentage amount

router.post('/v2/salary-percentage-amount', function (req, res) {

  var salaryAmount = req.session.data['amount'];
  var salaryUnit = req.session.data['unit'];
  var salaryFrequency = req.session.data['salary-percentage-frequency'];

  if (salaryAmount && salaryUnit && salaryFrequency) {
    res.redirect('/v2/salary-duration')
  } else {
    res.redirect('/v2/salary-percentage-amount')
  }

})

// Salary duration

router.post('/v2/salary-duration', function (req, res) {

  var duration = req.session.data['duration'];
  var durationFrequency = req.session.data['duration-frequency'];


  if (duration && durationFrequency) {
    res.redirect('/v2/senior-finance-lead')
  } else {
    res.redirect('/v2/salary-duration')
  }

})

// Senior finance lead

router.post('/v2/senior-finance-lead', function (req, res) {

  var financeLeadFirstName = req.session.data['financeLeadFirstName'];
  var financeLeadLastName = req.session.data['financeLeadLastName'];
  var financeLeadEmailAddress = req.session.data['financeLead-email-address'];

  var allowanceType = req.session.data['allowance-type'];

  if (financeLeadFirstName && financeLeadLastName && financeLeadEmailAddress) {
      
    if (allowanceType == 'clinical-excellence-award' || allowanceType == 'discretionary-points' || allowanceType == 'distinction-awards' || allowanceType == 'long-term-recruitment' || allowanceType == 'on-call-allowance' || allowanceType == 'short-term-recruitment' || allowanceType == 'shift-allowance' || allowanceType == 'other') {
      res.redirect('/v2/change-effective-from')
    } else if (allowanceType == 'hca-allowance-inner' || allowanceType == 'hca-allowance-outer' || allowanceType == 'hca-allowance-fringe' || allowanceType == 'hca-allowance-medical') {
      res.redirect('/v2/letter')
    } else {
      res.redirect('/v2/senior-finance-lead')
    }

  } else {
    res.redirect('/v2/senior-finance-lead')
  }

})

// Band or Grade type

router.post('/v2/band-or-grade-type', function (req, res) {

  var bandGradeType = req.session.data['band-or-grade-type'];

  if (bandGradeType) {
    res.redirect('/v2/new-position-number')
  } else {
    res.redirect('/v2/band-or-grade-type')
  }

})

// New position number (1)

router.post('/v2/new-position-number', function (req, res) {

  var newPositionNumber = req.session.data['newPositionNumber'];

  if (newPositionNumber) {
    res.redirect('/v2/new-pay-band')
  } else {
    res.redirect('/v2/new-position-number')
  }

})

// New pay band

router.post('/v2/new-pay-band', function (req, res) {

  var newPayBand = req.session.data['new-pay-band'];

  if (newPayBand) {
    res.redirect('/v2/new-step-point')
  } else {
    res.redirect('/v2/new-pay-band')
  }

})

// New step point

router.post('/v2/new-step-point', function (req, res) {

  var newStepPoint = req.session.data['newStepPoint'];

  if (newStepPoint) {
    res.redirect('/v2/new-salary-amount')
  } else {
    res.redirect('/v2/new-step-point')
  }

})

// New salary amount

router.post('/v2/new-salary-amount', function (req, res) {

  var newSalaryAmount = req.session.data['newSalaryAmount'];

  if (newSalaryAmount) {
    res.redirect('/v2/change-effective-from')
  } else {
    res.redirect('/v2/new-salary-amount')
  }

})

// New cost centre

router.post('/v2/new-cost-centre', function (req, res) {

  var newCostCentre = req.session.data['newCostCentre'];

  if (newCostCentre) {
    res.redirect('/v2/new-position-number-2')
  } else {
    res.redirect('/v2/new-cost-centre')
  }

})

// New position number (1)

router.post('/v2/new-position-number-2', function (req, res) {

  var newPositionNumber2 = req.session.data['newPositionNumber2'];

  if (newPositionNumber2) {
    res.redirect('/v2/change-effective-from')
  } else {
    res.redirect('/v2/new-position-number-2')
  }

})

// Future date change

router.post('/v2/future-date-change', function (req, res) {

  var futureDateChangeDay = req.session.data['future-date-change-day'];
  var futureDateChangeMonth = req.session.data['future-date-change-month'];
  var futureDateChangeYear = req.session.data['future-date-change-year'];

  if (!isNaN(futureDateChangeDay) && !isNaN(futureDateChangeMonth) && !isNaN(futureDateChangeYear)) {

    req.session.data['futureDateChange'] = DateTime.fromObject({
      day: futureDateChangeDay,
      month: futureDateChangeMonth,
      year: futureDateChangeYear
    }).toFormat("d MMMM yyyy");

    res.redirect('/v2/change-effective-from')
  } else {
    res.redirect('/v2/future-date-change')
  }

})

// Type of hours change

router.post('/v2/type-of-hour-change', function (req, res) {

  var hourChangeType = req.session.data['type-of-hour-change'];

  if (hourChangeType) {
    res.redirect('/v2/new-hours-pattern')
  } else {
    res.redirect('/v2/type-of-hour-change')
  }

})

// New hours pattern

router.post('/v2/new-hours-pattern', function (req, res) {

  var numberOfHours = req.session.data['number-of-hours'];
  var workingPattern = req.session.data['working-pattern'];

  if (workingPattern == 'Term time') {
    res.redirect('/v2/upload-document')
  } else if (workingPattern == 'Flexible working' || workingPattern == 'Annualised hours' || workingPattern == 'Condensed hours') {
    res.redirect('/v2/change-effective-from')
  } else {
    res.redirect('/v2/new-hours-pattern')
  }

})

// Upload document

router.post('/v2/upload-document', function (req, res) {

    res.redirect('/v2/documents-added')

})

// Documents added

router.post('/v2/documents-added', function (req, res) {

  res.redirect('/v2/change-effective-from')

})

// Leave or Break type

router.post('/v2/leave-or-break-type', function (req, res) {

  var leaveBreakType = req.session.data['leave-or-break-type'];

  if (leaveBreakType == 'Due to take a career break') {
    res.redirect('/v2/upload-document')
  } else if (leaveBreakType == 'Currently on a career break') {
    res.redirect('/v2/career-break-update')
  } else if (leaveBreakType == 'Due to to take unpaid leave') {
    res.redirect('/v2/change-effective-from')
  } else {
    res.redirect('/v2/leave-or-break-type')
  }

})

// Career break update

router.post('/v2/career-break-update', function (req, res) {

  var careerBreakUpdate = req.session.data['career-break-update'];

  if (careerBreakUpdate == 'Extend the career break') {
    res.redirect('/v2/career-break-extended-until')
  } else if (careerBreakUpdate == 'Provide an agreed return to work date and reinstate pay') {
    res.redirect('/v2/return-to-work-date')
  } else {
    res.redirect('/v2/career-break-update')
  }

})

// Career break extended until

router.post('/v2/career-break-extended-until', function (req, res) {

  var careerBreakExtendedUntilDay = req.session.data['career-break-extended-until-day'];
  var careerBreakExtendedUntilMonth = req.session.data['career-break-extended-until-month'];
  var careerBreakExtendedUntilYear = req.session.data['career-break-extended-until-year'];

  if (!isNaN(careerBreakExtendedUntilDay) && !isNaN(careerBreakExtendedUntilMonth) && !isNaN(careerBreakExtendedUntilYear)) {

    req.session.data['careerBreakExtendedUntil'] = DateTime.fromObject({
      day: careerBreakExtendedUntilDay,
      month: careerBreakExtendedUntilMonth,
      year: careerBreakExtendedUntilYear
    }).toFormat("d MMMM yyyy");

    res.redirect('/v2/change-effective-from')
  } else {
    res.redirect('/v2/career-break-extended-until')
  }

})

// Return to work date

router.post('/v2/return-to-work-date', function (req, res) {

  var returnToWorkDateDay = req.session.data['return-to-work-date-day'];
  var returnToWorkDateMonth = req.session.data['return-to-work-date-month'];
  var returnToWorkDateYear = req.session.data['return-to-work-date-year'];

  if (!isNaN(returnToWorkDateDay) && !isNaN(returnToWorkDateMonth) && !isNaN(returnToWorkDateYear)) {

    req.session.data['returnToWorkDate'] = DateTime.fromObject({
      day: returnToWorkDateDay,
      month: returnToWorkDateMonth,
      year: returnToWorkDateYear
    }).toFormat("d MMMM yyyy");

    res.redirect('/v2/change-effective-from')
  } else {
    res.redirect('/v2/return-to-work-date')
  }

})

// Other change

router.post('/v2/what-other-change', function (req, res) {

  var whatOtherChange = req.session.data['what-other-change'];

  if (whatOtherChange) {
    res.redirect('/v2/other-change-information')
  } else {
    res.redirect('/v2/what-other-change')
  }

})

// Other change information

router.post('/v2/other-change-information', function (req, res) {

  var otherChangeInformation = req.session.data['other-change-information'];

  if (otherChangeInformation) {
    res.redirect('/v2/document-to-upload')
  } else {
    res.redirect('/v2/other-change-information')
  }

})

// Document to upload

router.post('/v2/document-to-upload', function (req, res) {

  var documentToUpload = req.session.data['document-to-upload'];

  if (documentToUpload == 'Yes') {
    res.redirect('/v2/new-starter-form')
  } else if (documentToUpload == 'No') {
    res.redirect('/v2/change-effective-from')
  } else {
    res.redirect('/v2/document-to-upload')
  }

})

// New starter form

router.post('/v2/new-starter-form', function (req, res) {

  var newStarterForm = req.session.data['new-starter-form'];

  if (newStarterForm) {
    res.redirect('/v2/upload-document')
  } else {
    res.redirect('/v2/new-starter-form')
  }

})

module.exports = router;