import 'package:flutter/material.dart';
import 'package:intl/intl.dart'; // For date formatting

class BiometricApp extends StatefulWidget {
  const BiometricApp({super.key});

  @override
  _BiometricAppState createState() => _BiometricAppState();
}

class _BiometricAppState extends State<BiometricApp> {
  final TextEditingController _appNameController = TextEditingController();
  final TextEditingController _appLinkController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();

  DateTime? _startDate;
  DateTime? _endDate;
  int _testID = 1;

  Future<void> _selectDate(BuildContext context, bool isStartDate) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
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
        backgroundColor: const Color.fromARGB(255, 90, 121, 201),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Test ID
            Text(
              'Test ID: $_testID',
              style: const TextStyle(
                fontSize: 20,
                fontFamily: "Tommy",
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),

            // App Name
            TextField(
              controller: _appNameController,
              decoration: InputDecoration(
                labelText: 'App Name',
                labelStyle: const TextStyle(
                  fontSize: 16,
                  fontFamily: "Tommy",
                  fontWeight: FontWeight.bold,
                ),
                filled: true,
                fillColor: const Color.fromARGB(255, 235, 238, 250),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(20),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 10),

            // App Link
            TextField(
              controller: _appLinkController,
              decoration: InputDecoration(
                labelText: 'App Link',
                labelStyle: const TextStyle(
                  fontSize: 16,
                  fontFamily: "Tommy",
                  fontWeight: FontWeight.bold,
                ),
                filled: true,
                fillColor: const Color.fromARGB(255, 235, 238, 250),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(20),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 10),

            // Project Description
            TextField(
              controller: _descriptionController,
              decoration: InputDecoration(
                labelText: 'Project Description',
                labelStyle: const TextStyle(
                  fontSize: 16,
                  fontFamily: "Tommy",
                  fontWeight: FontWeight.bold,
                ),
                filled: true,
                fillColor: const Color.fromARGB(255, 235, 238, 250),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(20),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 10),

            // Start Date Picker
            Row(
              children: [
                Text(
                  'Start Date:',
                  style: const TextStyle(
                    fontSize: 16,
                    fontFamily: "Tommy",
                    fontWeight: FontWeight.bold,
                  ),
                ),
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
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(255, 235, 238, 250), // Change background color
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child: const Text(
                    'Pick Start Date',
                    style: TextStyle(
                      fontSize: 14,
                      fontFamily: "Tommy",
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),

            // End Date Picker
            Row(
              children: [
                Text(
                  'End Date:',
                  style: const TextStyle(
                    fontSize: 16,
                    fontFamily: "Tommy",
                    fontWeight: FontWeight.bold,
                  ),
                ),
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
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(255, 235, 238, 250), // Change background color
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child: const Text(
                    'Pick End Date',
                    style: TextStyle(
                      fontSize: 14,
                      fontFamily: "Tommy",
                      fontWeight: FontWeight.bold,
                      color:  Colors.black,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Submit Button
            Center(
              child: ElevatedButton(
                onPressed: () {
                  final String appName = _appNameController.text;
                  final String appLink = _appLinkController.text;
                  final String description = _descriptionController.text;
                  final String startDate = _startDate == null
                      ? 'Not Selected'
                      : DateFormat('yyyy-MM-dd').format(_startDate!);
                  final String endDate = _endDate == null
                      ? 'Not Selected'
                      : DateFormat('yyyy-MM-dd').format(_endDate!);

                  // Show Submitted Data
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
                            onPressed: () => Navigator.pop(context),
                            child: const Text('Close'),
                          ),
                        ],
                      );
                    },
                  );

                  setState(() {
                    _testID++;
                  });
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color.fromARGB(255, 90, 121, 201),
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                child: const Text(
                  'Submit',
                  style: TextStyle(
                    fontSize: 16,
                    fontFamily: "Tommy",
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
