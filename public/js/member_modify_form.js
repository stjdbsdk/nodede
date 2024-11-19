function memberModifyForm() {
	console.log('memberModifyForm()');
	
	let form = document.member_modify_form;
	if (form.m_pw.value === '') {
		alert('INPUT PW!!');
		form.m_pw.focus();
				
	} else if (form.m_mail.value === '') {
		alert('INPUT MAIL!!');
		form.m_mail.focus();
				
	} else if (form.m_phone.value === '') {
		alert('INPUT PHONE!!');
		form.m_phone.focus();
					
	} else {
		form.submit();
		
	}
	
}