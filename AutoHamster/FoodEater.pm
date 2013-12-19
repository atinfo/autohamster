package AutoHamster::FoodEater;
use strict; use warnings;
use utf8;
use parent qw[ Exporter ];

our @EXPORT = qw[ eat ];


sub eat {
    my ($filename) = @_;
    open (my $food, '<:utf8', $filename) or die "Cannot eat file\r\n $!";
    my @lines = <$food>;
    close $food;

    my @result = ( );


    my $line_content = "";
    my $lines_length = $#lines;
    for (my $i = 0; $i <= $lines_length; $i++)
    {
        my $line = $lines[$i];
        

        if ($i < $lines_length && $lines[$i + 1] !~ /^[0-9]{2}[\/\.][0-9]{2}[\/\.][0-9]{4}\s/s) 
        {
            $line_content = "$line_content" . $line;
            next;
        }
        else 
        {
            $line_content .= $line;
        }
        chomp $line_content;
        

        my ($date, $title, $url, $description, 
            $category, $tags_line, $submitter) = split /\t/, $line_content;
        
        $description =~ s/^"(.+)"$/$1/s;

        die "URL should start from http:// <$url>: str: $line_content" unless $url =~ /^https?:\/\//;
        
        my $item = {
                     date        => $date, 
                     title       => $title, 
                     url         => $url, 
                     description => $description, 
                     category    => $category, 
                     tags_line   => $tags_line,
                     submitter   => $submitter,

                   };
        
       # Come back and implement this feature, lazy bitch 
       # my @parsed_tags = split /,\s+/, $tags_line;
       # $item->{'tags'} = \@parsed_tags;

       push @result, $item;

       $line_content = "";
    }
    return @result;
}





"             .     .
            (>\---/<)
            ,'     `.
           /  q   p  \
          (  >(_Y_)<  )
           >-' `-' `-<-.
          /  _.== ,=.,- \
         /,    )`  '(    )
        ; `._.'      `--<
       :     \        |  )
       \      )       ;_/  hjw
        `._ _/_  ___.'-\\\
           `--\\\

http://www.retrojunkie.com/asciiart/animals/hamsters.htm
";
