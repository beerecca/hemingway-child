<?php
/*
Template Name: Form 
*/

if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {

	$to = get_bloginfo( 'admin_email');
	$subject = 'TikiPici Form (Haka Tours Customer)';
	$headers = array('Reply-to: ' . $_POST['first_name'] . ' <' . $_POST['email'] . '>',
					'Content-type: text/html');
	$message = "A Haka Tours Customer has filled out the form on tikipici.com.<br><br>Name: "
				.$_POST['first_name']." ".$_POST['last_name']."<br>Email: "
				.$_POST['email']."<br>Notes for Editor: "
				.$_POST['os7']."<br><br>Video Style: "
				.$_POST['os0']."<br>Awesome Template (if applicable): "
				.$_POST['os1']."<br>Soundtrack: "
				.$_POST['os2']."<br>File Link: "
				.$_POST['os3'];

	$toHaka = $_POST['email'];
	$subjectHaka = 'TikiPici Confirmation';
	$headersHaka = array('Reply-to: TikiPici <tikipici@gmail.com>',
					'From: TikiPici <info@tikipici.com>',
					'Content-type: text/html');
	$messageHaka = "Thanks for filling out the form on tikipici.com. This email confirms your order. We will be in touch with you over the next few days.<br><br>Name: "
				.$_POST['first_name']." ".$_POST['last_name']."<br>Email: "
				.$_POST['email']."<br>Notes for Editor: "
				.$_POST['os7']."<br><br>Video Style: "
				.$_POST['os0']."<br>Awesome Template (if applicable): "
				.$_POST['os1']."<br>Soundtrack: "
				.$_POST['os2']."<br>File Link: "
				.$_POST['os3'];
	
	wp_mail($to,$subject,$message,$headers);
	wp_mail($toHaka,$subjectHaka,$messageHaka,$headersHaka);

	wp_redirect( home_url()."/thanks-haka" ); 
	exit;
}

?>

<?php get_header(); ?>

<div class="wrapper section-inner">						
	<div class="content full-width">
	
		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			
		<div class="posts">
			<div class="post">
			
				<?php if ( has_post_thumbnail() ) : ?>
					
					<div class="featured-media">
					
						<a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title(); ?>">
						
							<?php the_post_thumbnail('post-image'); ?>
							
							<?php if ( !empty(get_post(get_post_thumbnail_id())->post_excerpt) ) : ?>
								<div class="media-caption-container">
									<p class="media-caption"><?php echo get_post(get_post_thumbnail_id())->post_excerpt; ?></p>
								</div>
							<?php endif; ?>
							
						</a>
								
					</div> <!-- /featured-media -->
						
				<?php endif; ?>
													
				<div class="post-header">
				    <h2 class="post-title"><?php the_title(); ?></h2>
			    </div> <!-- /post-header -->
			   				        			        		                
				<div class="post-content">           
					<?php the_content(); ?>

					<div class="overlay">
						<div class="terms-text">
							<div class="exit">X</div>
							<h3>Terms and Conditions</h3>
							<?php the_field('terms'); ?>
						</div>
					</div>
					
					<div class="permalink" id="<?php echo the_permalink();?>"></div>

					<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class="upload">
						<input type="hidden" name="cmd" value="_s-xclick">
						<input type="hidden" name="hosted_button_id" value="2MC7ABXJ8KRUJ">
						<input type="hidden" name="currency_code" value="NZD">

						<!-- YOUR INFO SECTION -->
						<section class="clearfix">
							<h2><span class="icon-user"></span> Your Info</h2>

							<div class="col">
								<label for="first-name">First Name</label><br>
								<input type="text" maxlength=100 name="first_name">
								<label for="last-name">Last Name</label><br>
								<input type="text" maxlength=100 name="last_name">
								<label for="email">Email</label><br>
								<input type="text" maxlength=100 name="email">
							</div>

							<div class="col-right">
								<label for="notes">Notes for your video editor</label><br>
								<input type="hidden" name="on7" value="Notes">
								<textarea rows="10" cols="30" maxlength=200 name="os7"></textarea>
							</div>

						</section>

						<!-- STYLE SECTION -->
						<section class="clearfix">
							<h2><span class="icon-film"></span> Style</h2>
							
							<div class="col">
								<?php the_field('style'); ?>
							</div>

							<div class="col-right">
							
								<input type="hidden" name="on0" value="Package">
								
								<div class="dropdown1">
									<label for="cd-dropdown">Select your video style: </label>
									<select name="os0" id="cd-dropdown" class="cd-select">
										<option value="-1" selected>Please select...</option>
										<option value="Awesome - 2 weeks">AWESOME (ready in 2 weeks) $285.00</option>
										<option value="Awesome - 1 week">AWESOME (ready in 1 week) $350.00</option>
										<option value="Primo - 2 weeks">PRIMO (ready in 2 weeks) $385.00</option>
										<option value="Primo - 1 week">PRIMO (ready in 1 week) $450.00</option>
										<option value="Boss - 2 weeks">BOSS  (ready in 2 weeks) $1,200.00</option>
										<option value="Boss - 1 week">BOSS (ready in 1 week) $1,350.00</option>
									</select> <br>
								</div>

								<input type="hidden" name="on1" value="Awesome Template">

								<div class="dropdown2">
									<label for="os1">Select your Awesome template: </label>
									<select name="os1" id="cd-dropdown2" class="cd-select">
										<option value="N/A" selected>Please select...</option>
										<option value="Group">Group </option>
										<option value="Random">Random </option>
										<option value="Selfie">Selfie </option>
										<option value="Panorama">Panorama </option>
									</select>
								</div>

							</div>

						</section>

						<!-- SOUNDTRACK SECTION -->
						<section class="soundtrack clearfix">
							<?php $url = get_stylesheet_directory_uri();?>
							
							<h2><span class="icon-music"></span> Soundtrack</h2>

							<p>Please note that the following tracks contain copyright voiceovers that will not be in your final video.</p>
							
							<input type="hidden" name="on2" value="Soundtrack">
							<div class="col">
								<input type="radio" name="os2" value="Keeling" id="Keeling" checked>
								<label for="Keeling">Keeling</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/keeling.mp3') ) ?>
								
								<input type="radio" name="os2" value="Planet Vibes" id="Planet Vibes">
								<label for="Planet Vibes">Planet Vibes</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/planet-vibes.mp3') ) ?>
							</div>

							<div class="col-right">
								<input type="radio" name="os2" value="Undertow" id="Undertow">
								<label for="Undertow">Undertow</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/undertow.mp3') ) ?>
								
								<input type="radio" name="os2" value="Borderline" id="Borderline">
								<label for="Borderline">Borderline</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/borderline.mp3') ) ?>
							</div>

							<input class="button more" type="button" value="More"><br>

							<div class="col hidden">
								<input type="radio" name="os2" value="All Time Winner" id="All Time Winner">
								<label for="All Time Winner">All Time Winner</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/all-time-winner.mp3') ) ?>
								
								<input type="radio" name="os2" value="Feel It" id="Feel It">
								<label for="Feel It">Feel It</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/feel-it.mp3') ) ?>

								<input type="radio" name="os2" value="Feel" id="Feel">
								<label for="Feel">Feel</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/feel.mp3') ) ?>

								<input type="radio" name="os2" value="Here For You" id="Here For You">
								<label for="Here For You">Here For You</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/here-for-you.mp3') ) ?>

								<input type="radio" name="os2" value="In Yo Face" id="In Yo Face">
								<label for="In Yo Face">In Yo Face</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/in-yo-face.mp3') ) ?>

								<input type="radio" name="os2" value="Rock It" id="Rock It">
								<label for="Rock It">Rock It</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/rock-it.mp3') ) ?>
							</div>

							<div class="col-right hidden">
								<input type="radio" name="os2" value="Class Connection" id="Class Connection">
								<label for="Class Connection">Class Connection</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/class-connection.mp3') ) ?>
								
								<input type="radio" name="os2" value="Deeply Reflective" id="Deeply Reflective">
								<label for="Deeply Reflective">Deeply Reflective</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/deeply-reflective.mp3') ) ?>

								<input type="radio" name="os2" value="Salute" id="Salute">
								<label for="Salute">Salute</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/salute.mp3') ) ?>

								<input type="radio" name="os2" value="Sweat Bucket" id="Sweat Bucket">
								<label for="Sweat Bucket">Sweat Bucket</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/sweat-bucket.mp3') ) ?>

								<input type="radio" name="os2" value="Avante" id="Avante">
								<label for="Avante">Avante</label>
								<?php echo wp_audio_shortcode( array('src'=>$url.'/music/avante.mp3') ) ?>
							</div>

						</section>

						<!-- FILES SECTION -->
						<section>
							<h2><span class="icon-upload"></span> Files</h2>

							<?php the_field('file'); ?>
							
							<label for="filepath">Sharing Link (copy and paste from Google Drive)</label><br>
							<input type="hidden" name="on3" value="File">
							<input type="text" id="filepath" maxlength=200 name="os3"><br>
							<!-- <button type="button" id="pick">Pick File</button> -->
						</section>

						<!-- PAYMENT SECTION -->
						<section class="payment">
							<h2><span class="icon-paypal"></span> Payment</h2>
							<input type="checkbox" name="terms" value="terms" id="terms">
							<label for="terms">I agree to the </label><a class="terms-activate" href="#">terms and conditions</a><br>

							<input class="button pay" type="submit" name="submit" value="Submit and Pay" />
							<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
							<input class="button paid" type="submit" value="Submit (I've already paid with Haka Tours)" />
						</section>

					</form>

		            
		            <?php if ( current_user_can( 'manage_options' ) ) : ?>
																	
						<p><?php edit_post_link( __('Edit', 'hemingway') ); ?></p>
					
					<?php endif; ?>
					
					<div class="clear"></div>				            			                        
				</div> <!-- /post-content -->
			</div> <!-- /post -->
			
			<?php if ( comments_open() ) : ?>
				<?php comments_template( '', true ); ?>
			<?php endif; ?>
		
		</div> <!-- /posts -->
		
		<?php endwhile; else: ?>
			<p><?php _e("We couldn't find any posts that matched your query. Please try again.", "hemingway"); ?></p>
		<?php endif; ?>
	
	</div> <!-- /content -->
	
</div> <!-- /wrapper section-inner -->
								
<?php get_footer(); ?>
