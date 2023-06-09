import { environment } from './../../../environments/environment';
import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: any) {

    const loading = await this.loadingCtrl.create({
      message: 'loading..',
      spinner: 'bubbles'
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) => {
      loading.dismiss();
      this.movies.push(...res.results);
      console.log(res);

      event?.target.complete();
      if(event) {
        event.target.disabled = res.total_pages === this.currentPage;
      };
    });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadMovies(event);
  }

}
