from django.test import TestCase
from django.contrib.auth.models import User
from .models import Event

# Create your tests here.

class AuthenticationTest(TestCase):
    def setUp(self):
        User.objects.create(id=200000,username='fakeuser',password='fakepass')

    def test_secure_page(self):
        loggedin = self.client.login(username='fakeuser',password='fakepass')
        response = self.client.get('/', follow=True)
        self.assertEqual(loggedin,True)

"""
class EventModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Event.objects.create(id=200000,text='fakevent',start='fakestart',end='fakeend', author_id=200000)
    
    def test_first_name_label(self):
        event = Event.objects.get(id=200000)
        field_label = event._meta.get_field('text').verbose_name
        self.assertEqual(field_label, 'text')

    def test_start_time(self):
        event = Event.objects.get(id=200000)
        field_label = event._meta.get_field('start').verbose_name
        self.assertEqual(field_label, 'start')

    def test_end_time(self):
        event = Event.objects.get(id=200000)
        field_label = event._meta.get_field('end').verbose_name
        self.assertEqual(field_label, 'end')

    def test_text_max_length(self):
        event = Event.objects.get(id=200000)
        max_length = event._meta.get_field('text').max_length
        self.assertEqual(max_length, 100)


    def test_get_absolute_url(self):
        event = Event.objects.get(id=200000)
        # This will also fail if the urlconf is not defined.
        self.assertEqual(event.get_absolute_url(), 'api/events/200000/')
"""