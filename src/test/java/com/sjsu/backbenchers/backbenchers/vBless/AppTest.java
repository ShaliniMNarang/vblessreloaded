package com.sjsu.backbenchers.backbenchers.vBless;

import static org.mockito.Mockito.when;

import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import com.sjsu.backbenchers.vBless.service.EmailService;

import org.junit.Test;
import junit.framework.TestCase;

/**
 * Unit test for simple App.
 */
@RunWith(MockitoJUnitRunner.class)
public class AppTest 
    extends TestCase
{

	@Mock
	EmailService emailService;
	

	
	@Test
	public void test() {
		
		when(emailService.sendEmail(1L)).thenReturn("S");
		
		assertEquals("S",emailService.sendEmail(1L));
	}
}
