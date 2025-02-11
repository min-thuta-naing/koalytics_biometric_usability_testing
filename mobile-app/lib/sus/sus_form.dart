import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:koalytics_biometric_usability_testing/sus/sus_quest.dart'; // For date formatting

class SusPage extends StatefulWidget {
  const SusPage({super.key});

  @override
  _SusPageState createState() => _SusPageState();
}

class _SusPageState extends State<SusPage> {
  final TextEditingController _participantNameController = TextEditingController();
  final TextEditingController _participantEmailController = TextEditingController();
  final TextEditingController _commentsController = TextEditingController();

  DateTime? _testDate;
  int _susID = 1;

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );

    if (pickedDate != null) {
      setState(() {
        _testDate = pickedDate;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'SUS Form', 
          style: TextStyle(
            fontFamily: "Tommy",
            fontSize: 25,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        backgroundColor: Color.fromARGB(255, 90, 121, 201),
        iconTheme: const IconThemeData(
          color: Colors.white, // White back arrow
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'SUS ID: $_susID',
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),

            // Participant Name
            TextField(
              controller: _participantNameController,
              decoration: InputDecoration(
                labelText: 'Name',
                filled: true,
                fillColor: const Color.fromARGB(255, 235, 238, 250),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(20),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 10),

            // Participant Email
            TextField(
              controller: _participantEmailController,
              decoration: InputDecoration(
                labelText: 'Description',
                filled: true,
                fillColor: const Color.fromARGB(255, 235, 238, 250),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(20),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 10),

            // Test Date Picker
            Row(
              children: [
                const Text(
                  'Test Date:',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(width: 10),
                Text(
                  _testDate == null
                      ? 'Select Date'
                      : DateFormat('yyyy-MM-dd').format(_testDate!),
                  style: const TextStyle(fontSize: 16),
                ),
                const SizedBox(width: 10),
                ElevatedButton(
                  onPressed: () => _selectDate(context),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromARGB(255, 235, 238, 250),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child: const Text(
                    'Pick Date',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),

            // Comments
            TextField(
              controller: _commentsController,
              decoration: InputDecoration(
                labelText: 'Comments',
                filled: true,
                fillColor: const Color.fromARGB(255, 235, 238, 250),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(20),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Submit Button
            Center(
              child: ElevatedButton(
                // onPressed: () {
                //   final String participantName = _participantNameController.text;
                //   final String participantEmail = _participantEmailController.text;
                //   final String comments = _commentsController.text;
                //   final String testDate = _testDate == null
                //       ? 'Not Selected'
                //       : DateFormat('yyyy-MM-dd').format(_testDate!);

                //   showDialog(
                //     context: context,
                //     builder: (BuildContext context) {
                //       return AlertDialog(
                //         title: const Text('SUS Form Submitted'),
                //         content: Text(
                //           'SUS ID: $_susID\n'
                //           'Participant Name: $participantName\n'
                //           'Participant Email: $participantEmail\n'
                //           'Test Date: $testDate\n'
                //           'Comments: $comments',
                //         ),
                //         actions: [
                //           TextButton(
                //             onPressed: () => Navigator.pop(context),
                //             child: const Text('Close'),
                //           ),
                //         ],
                //       );
                //     },
                //   );

                //   setState(() {
                //     _susID++;
                //   });
                // },
                 onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const SusQuest()),
                  );
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
