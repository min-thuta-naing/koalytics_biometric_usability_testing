
import 'package:flutter/material.dart';
// ignore: depend_on_referenced_packages
import 'package:intl/intl.dart'; // For date formatting


class BiometricApp extends StatefulWidget {
 const BiometricApp({super.key});


 @override
 _BiometricAppState createState() => _BiometricAppState();
}


class _BiometricAppState extends State<BiometricApp> {
 // Text controllers for form fields
 final TextEditingController _appNameController = TextEditingController();
 final TextEditingController _appLinkController = TextEditingController();
 final TextEditingController _descriptionController = TextEditingController();


 // Date pickers for start and end date
 DateTime? _startDate;
 DateTime? _endDate;


 // Auto-generated Test ID (serial order)
 int _testID = 1; // Start with Test ID = 1


 // Function to pick a date
 Future<void> _selectDate(BuildContext context, bool isStartDate) async {
   final DateTime initialDate = DateTime.now();
   final DateTime firstDate = DateTime(2000);
   final DateTime lastDate = DateTime(2101);


   final DateTime? pickedDate = await showDatePicker(
     context: context,
     initialDate: initialDate,
     firstDate: firstDate,
     lastDate: lastDate,
   );


   if (pickedDate != null) {
     setState(() {
       if (isStartDate) {
         _startDate = pickedDate;
       } else {
         _endDate = pickedDate;
       }
     });
   }
 }


 @override
 Widget build(BuildContext context) {
   return Scaffold(
     appBar: AppBar(
       title: const Text('Biometric App'),
       backgroundColor: Colors.blue,
     ),
     body: Padding(
       padding: const EdgeInsets.all(16.0),
       child: Column(
         crossAxisAlignment: CrossAxisAlignment.start,
         children: [
           // Display the auto-generated Test ID
           Text(
             'Test ID: $_testID',
             style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
           ),
           const SizedBox(height: 20),
          
           // App Name Field
           TextField(
             controller: _appNameController,
             decoration: const InputDecoration(
               labelText: 'App/Website Name',
               border: OutlineInputBorder(),
             ),
           ),
           const SizedBox(height: 10),
          
           // App Link Field
           TextField(
             controller: _appLinkController,
             decoration: const InputDecoration(
               labelText: 'App Link',
               border: OutlineInputBorder(),
             ),
           ),
           const SizedBox(height: 10),
          
           // Project Description Field
           TextField(
             controller: _descriptionController,
             decoration: const InputDecoration(
               labelText: 'Project Description',
               border: OutlineInputBorder(),
             ),
           ),
           const SizedBox(height: 10),
          
           // Start Date Picker
           Row(
             children: [
               const Text('Start Date: '),
               const SizedBox(width: 10),
               Text(
                 _startDate == null
                     ? 'Select Date'
                     : DateFormat('yyyy-MM-dd').format(_startDate!),
                 style: const TextStyle(fontSize: 16),
               ),
               const SizedBox(width: 10),
               ElevatedButton(
                 onPressed: () => _selectDate(context, true),
                 child: const Text('Pick Start Date'),
               ),
             ],
           ),
           const SizedBox(height: 10),
          
           // End Date Picker
           Row(
             children: [
               const Text('End Date: '),
               const SizedBox(width: 10),
               Text(
                 _endDate == null
                     ? 'Select Date'
                     : DateFormat('yyyy-MM-dd').format(_endDate!),
                 style: const TextStyle(fontSize: 16),
               ),
               const SizedBox(width: 10),
               ElevatedButton(
                 onPressed: () => _selectDate(context, false),
                 child: const Text('Pick End Date'),
               ),
             ],
           ),
           const SizedBox(height: 20),


           // Submit Button
           Center(
             child: ElevatedButton(
               onPressed: () {
                 // Handle form submission logic here
                 final String appName = _appNameController.text;
                 final String appLink = _appLinkController.text;
                 final String description = _descriptionController.text;
                 final String startDate =
                     _startDate == null ? 'Not Selected' : DateFormat('yyyy-MM-dd').format(_startDate!);
                 final String endDate =
                     _endDate == null ? 'Not Selected' : DateFormat('yyyy-MM-dd').format(_endDate!);


                 // Display the submitted values
                 showDialog(
                   context: context,
                   builder: (BuildContext context) {
                     return AlertDialog(
                       title: const Text('Form Submitted'),
                       content: Text(
                         'Test ID: $_testID\n'
                         'App Name: $appName\n'
                         'App Link: $appLink\n'
                         'Description: $description\n'
                         'Start Date: $startDate\n'
                         'End Date: $endDate',
                       ),
                       actions: [
                         TextButton(
                           onPressed: () {
                             Navigator.pop(context); // Close the dialog
                           },
                           child: const Text('Close'),
                         ),
                       ],
                     );
                   },
                 );


                 // Increment the Test ID for the next submission
                 setState(() {
                   _testID++;
                 });
               },
               child: const Text('Submit'),
             ),
           ),
         ],
       ),
     ),
   );
 }
}


class DateFormat {
 DateFormat(String s);
  format(DateTime dateTime) {}
}
